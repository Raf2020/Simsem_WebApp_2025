'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useForm, UseFormReturn, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod validation schemas
const menuItemSchema = z.object({
  name: z.string().min(1, 'Menu item name is required'),
  description: z.string().min(1, 'Menu item description is required'),
  category: z.string().min(1, 'Category is required'),
});

const foodItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  dietaryTags: z.array(z.string()),
  category: z.string(),
});

export const mealDetailsSchema = z.object({
  // Meal Categories
  selectedMealCategories: z.array(z.string()).min(1, 'At least one meal category must be selected'),

  // Selected Food Items - this is the main validation we need
  selectedFoodItems: z.record(z.string(), z.array(foodItemSchema))
    .refine((items) => {
      // Check if at least one category has at least one food item
      return Object.values(items).some(categoryItems => categoryItems.length > 0);
    }, {
      message: 'At least one meal must be selected'
    }),

  // Menu Selection (keeping for backward compatibility)
  menuItems: z.array(menuItemSchema).optional(),
  customMenuDescription: z.string().optional(),
});

// Types
export type MealDetailsFormData = z.infer<typeof mealDetailsSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type FoodItem = z.infer<typeof foodItemSchema>;

// Available meal categories
export const mealCategories = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Appetizer, salads, soups',
    icon: 'coffee' // Coffee cup icon representing starter
  },
  {
    id: 'main-course',
    name: 'Main Course',
    description: 'Main dishes, entrees',
    icon: 'kitchen' // Fork and knife icon
  },
  {
    id: 'dessert',
    name: 'Dessert',
    description: 'Main dishes, entrees',
    icon: 'cake' // Cake slice icon
  }
];

// Default values
const defaultValues: MealDetailsFormData = {
  selectedMealCategories: [],
  selectedFoodItems: {},
  menuItems: [],
  customMenuDescription: '',
};

interface MealDetailsContextType {
  form: UseFormReturn<MealDetailsFormData>;
  menuItemsArray: ReturnType<typeof useFieldArray<MealDetailsFormData, 'menuItems'>>;

  // Custom actions
  toggleMealCategory: (category: string) => void;
  addMenuItem: (category: string) => void;
  removeMenuItem: (index: number) => void;

  // Food item management
  addFoodItems: (categoryId: string, items: FoodItem[]) => void;
  removeFoodItem: (categoryId: string, itemId: string) => void;

  // Computed values
  isFormValid: boolean;
  selectedCategories: string[];
  selectedFoodItems: Record<string, FoodItem[]>;
}

// Create context
const MealDetailsContext = createContext<MealDetailsContextType | undefined>(undefined);

// Provider component
interface MealDetailsProviderProps {
  children: ReactNode;
}

export function MealDetailsProvider({ children }: MealDetailsProviderProps) {
  const form = useForm<MealDetailsFormData>({
    resolver: zodResolver(mealDetailsSchema),
    defaultValues,
    mode: 'onChange',
  });

  const menuItemsArray = useFieldArray({
    control: form.control,
    name: 'menuItems',
  });

  // Custom toggle meal category function
  const toggleMealCategory = (category: string) => {
    const currentCategories = form.getValues('selectedMealCategories');
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];

    form.setValue('selectedMealCategories', newCategories, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  // Add menu item for specific category
  const addMenuItem = (category: string) => {
    menuItemsArray.append({
      name: '',
      description: '',
      category: category,
    });
  };

  // Remove menu item
  const removeMenuItem = (index: number) => {
    menuItemsArray.remove(index);
  };

  // Add food items to a category
  const addFoodItems = (categoryId: string, items: FoodItem[]) => {
    const currentFoodItems = form.getValues('selectedFoodItems');
    const updatedFoodItems = {
      ...currentFoodItems,
      [categoryId]: [...(currentFoodItems[categoryId] || []), ...items]
    };

    form.setValue('selectedFoodItems', updatedFoodItems, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  // Remove a specific food item from a category
  const removeFoodItem = (categoryId: string, itemId: string) => {
    const currentFoodItems = form.getValues('selectedFoodItems');
    const updatedFoodItems = {
      ...currentFoodItems,
      [categoryId]: (currentFoodItems[categoryId] || []).filter(item => item.id !== itemId)
    };

    form.setValue('selectedFoodItems', updatedFoodItems, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  // Computed values
  const isFormValid = form.formState.isValid;
  const selectedCategories = form.watch('selectedMealCategories');
  const selectedFoodItems = form.watch('selectedFoodItems');

  const contextValue: MealDetailsContextType = {
    form,
    menuItemsArray,
    toggleMealCategory,
    addMenuItem,
    removeMenuItem,
    addFoodItems,
    removeFoodItem,
    isFormValid,
    selectedCategories,
    selectedFoodItems,
  };

  return (
    <MealDetailsContext.Provider value={contextValue}>
      {children}
    </MealDetailsContext.Provider>
  );
}

// Custom hook to use the context
export function useMealDetails() {
  const context = useContext(MealDetailsContext);
  
  if (context === undefined) {
    throw new Error('useMealDetails must be used within a MealDetailsProvider');
  }
  
  return context;
}

// Export the context for advanced use cases
export { MealDetailsContext };
