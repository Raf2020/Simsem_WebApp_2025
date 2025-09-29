'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod validation schema
export const basicInformationSchema = z.object({
  tourTitle: z.string().min(1, 'Tour title is required').min(3, 'Tour title must be at least 3 characters'),
  selectedCategories: z.array(z.string()).min(1, 'At least one category must be selected'),
  tourOverview: z.string().min(1, 'Tour overview is required').min(10, 'Tour overview must be at least 10 characters'),
});

// Types
export type BasicInformationFormData = z.infer<typeof basicInformationSchema>;

export interface BasicInformationContextType {
  // React Hook Form instance
  form: UseFormReturn<BasicInformationFormData>;

  // Custom actions
  toggleCategory: (category: string) => void;

  // Computed values
  isFormValid: boolean;
}

// Create context
const BasicInformationContext = createContext<BasicInformationContextType | undefined>(undefined);

// Provider component
interface BasicInformationProviderProps {
  children: ReactNode;
}

export function BasicInformationProvider({ children }: BasicInformationProviderProps) {
  const form = useForm<BasicInformationFormData>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      tourTitle: '',
      selectedCategories: [],
      tourOverview: '',
    },
    mode: 'onChange', // Validate on change for real-time feedback
  });

  // Custom toggle category function
  const toggleCategory = (category: string) => {
    const currentCategories = form.getValues('selectedCategories');
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];

    form.setValue('selectedCategories', newCategories, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  // Computed values
  const isFormValid = form.formState.isValid;

  const contextValue: BasicInformationContextType = {
    form,
    toggleCategory,
    isFormValid,
  };

  return (
    <BasicInformationContext.Provider value={contextValue}>
      {children}
    </BasicInformationContext.Provider>
  );
}

// Custom hook to use the context
export function useBasicInformation() {
  const context = useContext(BasicInformationContext);
  
  if (context === undefined) {
    throw new Error('useBasicInformation must be used within a BasicInformationProvider');
  }
  
  return context;
}

// Export the context for advanced use cases
export { BasicInformationContext };
