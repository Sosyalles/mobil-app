import React, { useState, useCallback } from 'react';
import { 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  TextStyle
} from 'react-native';
import { EventCategory, EVENT_CATEGORIES } from '../../../types/event';
import { Typography } from '../../common/Typography';
import { COLORS } from '../../../theme/colors';

interface EventCategoriesProps {
  onSelectCategory: (category: EventCategory | null) => void;
  initialCategory?: EventCategory | null;
}

export const EventCategories: React.FC<EventCategoriesProps> = ({ 
  onSelectCategory,
  initialCategory = null
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(initialCategory);

  const handleCategoryPress = useCallback((category: EventCategory) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    onSelectCategory(newCategory);
  }, [selectedCategory, onSelectCategory]);

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {EVENT_CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              isSelected && styles.selectedCategory
            ]}
            onPress={() => handleCategoryPress(category)}
            accessibilityRole="button"
            accessibilityLabel={`Select ${category} category`}
          >
            <Typography 
              variant="button"
              style={isSelected ? styles.selectedCategoryText : styles.categoryText}
            >
              {category}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  categoryButton: {
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.SECONDARY,
  },
  selectedCategory: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  categoryText: {
    color: COLORS.TEXT_PRIMARY,
  },
  selectedCategoryText: {
    color: COLORS.WHITE,
  },
}); 