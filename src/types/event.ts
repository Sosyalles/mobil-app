export const EVENT_CATEGORIES = [
  'Spor', 
  'Kültür', 
  'Sanat', 
  'Eğitim', 
  'Sosyal', 
  'Diğer'
] as const;

export type EventCategory = typeof EVENT_CATEGORIES[number];

export interface Event {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly date: Date;
  readonly location: string;
  readonly category: EventCategory;
  readonly participantCount: number;
  readonly imageUrl?: string;
}

export function isValidEventCategory(category: unknown): category is EventCategory {
  return typeof category === 'string' && 
    (EVENT_CATEGORIES as readonly string[]).includes(category);
}

export function createEvent(eventData: Omit<Event, 'id'>): Event {
  // Additional validation can be added here
  if (!eventData.title.trim()) {
    throw new Error('Event title cannot be empty');
  }

  if (eventData.participantCount < 0) {
    throw new Error('Participant count cannot be negative');
  }

  return {
    ...eventData,
    id: crypto?.randomUUID?.() || Math.random().toString(36).substring(2, 15)
  };
} 