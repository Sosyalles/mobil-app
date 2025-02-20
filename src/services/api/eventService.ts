import { 
  Event, 
  EventCategory, 
  isValidEventCategory, 
  createEvent 
} from '../../types/event';

// Mock data - in a real app, this would come from an API
const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Futbol Turnuvası',
    description: 'Yaz futbol turnuvamıza katılın!',
    date: new Date('2024-07-15'),
    location: 'Stadyum',
    category: 'Spor',
    participantCount: 24,
    imageUrl: 'https://example.com/football.jpg'
  },
  {
    id: '2',
    title: 'Resim Sergisi',
    description: 'Genç sanatçılardan resim sergisi',
    date: new Date('2024-08-20'),
    location: 'Sanat Galerisi',
    category: 'Sanat',
    participantCount: 50,
    imageUrl: 'https://example.com/art.jpg'
  }
];

export class EventService {
  // Fetch all events with optional filtering
  static async getEvents(options?: {
    category?: EventCategory;
    limit?: number;
  }): Promise<Event[]> {
    return new Promise((resolve) => {
      let events = [...MOCK_EVENTS];

      // Apply category filter if provided
      if (options?.category) {
        events = events.filter(event => event.category === options.category);
      }

      // Apply limit if provided
      if (options?.limit) {
        events = events.slice(0, options.limit);
      }

      setTimeout(() => resolve(events), 300);
    });
  }

  // Fetch events by category with type safety
  static async getEventsByCategory(category: EventCategory): Promise<Event[]> {
    return this.getEvents({ category });
  }

  // Get event by ID with error handling
  static async getEventById(id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const event = MOCK_EVENTS.find(e => e.id === id);
      
      setTimeout(() => {
        if (event) {
          resolve(event);
        } else {
          reject(new Error(`Event with id ${id} not found`));
        }
      }, 300);
    });
  }

  // Add new event with comprehensive validation
  static async createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
    // Validate category
    if (!isValidEventCategory(eventData.category)) {
      throw new Error(`Invalid event category: ${eventData.category}`);
    }

    try {
      const newEvent = createEvent(eventData);
      MOCK_EVENTS.push(newEvent);
      return newEvent;
    } catch (error) {
      throw new Error(`Failed to create event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Update existing event
  static async updateEvent(id: string, updates: Partial<Omit<Event, 'id'>>): Promise<Event> {
    return new Promise((resolve, reject) => {
      const eventIndex = MOCK_EVENTS.findIndex(e => e.id === id);
      
      if (eventIndex === -1) {
        reject(new Error(`Event with id ${id} not found`));
        return;
      }

      // Validate updates
      if (updates.category && !isValidEventCategory(updates.category)) {
        reject(new Error(`Invalid event category: ${updates.category}`));
        return;
      }

      const updatedEvent: Event = {
        ...MOCK_EVENTS[eventIndex],
        ...updates
      };

      MOCK_EVENTS[eventIndex] = updatedEvent;
      
      setTimeout(() => resolve(updatedEvent), 300);
    });
  }

  // Delete event
  static async deleteEvent(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const eventIndex = MOCK_EVENTS.findIndex(e => e.id === id);
      
      if (eventIndex === -1) {
        reject(new Error(`Event with id ${id} not found`));
        return;
      }

      MOCK_EVENTS.splice(eventIndex, 1);
      
      setTimeout(resolve, 300);
    });
  }
} 