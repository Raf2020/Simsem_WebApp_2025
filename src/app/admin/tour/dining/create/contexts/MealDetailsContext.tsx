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

export const mealDetailsSchema = z.object({
  // Meal Categories
  selectedMealCategories: z.array(z.string()).min(1, 'At least one meal category must be selected'),
  
  // Menu Selection
  menuItems: z.array(menuItemSchema).min(1, 'At least one menu item is required'),
  customMenuDescription: z.string().optional(),
});

// Types
export type MealDetailsFormData = z.infer<typeof mealDetailsSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;

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
  
  // Computed values
  isFormValid: boolean;
  selectedCategories: string[];
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

  // Computed values
  const isFormValid = form.formState.isValid;
  const selectedCategories = form.watch('selectedMealCategories');

  const contextValue: MealDetailsContextType = {
    form,
    menuItemsArray,
    toggleMealCategory,
    addMenuItem,
    removeMenuItem,
    isFormValid,
    selectedCategories,
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
