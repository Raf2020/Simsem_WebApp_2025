'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Language proficiency levels
export const PROFICIENCY_LEVELS = {
  NATIVE: 'NATIVE',
  FLUENT: 'FLUENT', 
  CONVERSATIONAL: 'CONVERSATIONAL',
  BASIC: 'BASIC'
} as const;

export type ProficiencyLevel = keyof typeof PROFICIENCY_LEVELS;

// Language schema
const languageSchema = z.object({
  name: z.string().min(1, 'Language name is required'),
  proficiency: z.enum(['NATIVE', 'FLUENT', 'CONVERSATIONAL', 'BASIC'], {
    message: 'Please select a proficiency level'
  }),
  badgeColor: z.string().optional(),
  badgeTextColor: z.string().optional()
});

// Zod validation schema
export const languageFormSchema = z.object({
  languages: z.array(languageSchema)
    .min(3, 'Please add at least three language')
    .refine(
      (languages) => {
        // Check for duplicate language names
        const names = languages.map(lang => lang.name.toLowerCase());
        return new Set(names).size === names.length;
      },
      {
        message: 'Each language can only be added once'
      }
    )
});

// Types
export type Language = z.infer<typeof languageSchema>;
export type LanguageFormData = z.infer<typeof languageFormSchema>;

export interface LanguageContextType {
  // React Hook Form instance
  form: UseFormReturn<LanguageFormData>;

  // Custom actions
  addLanguage: (language: Omit<Language, 'badgeColor' | 'badgeTextColor'>) => void;
  removeLanguage: (index: number) => void;
  updateLanguage: (index: number, updates: Partial<Language>) => void;

  // Computed values
  isFormValid: boolean;
  languages: Language[];
  canAddMore: boolean;
  hasMinimumLanguages: boolean;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const form = useForm<LanguageFormData>({
    resolver: zodResolver(languageFormSchema),
    defaultValues: {
      languages: []
    },
    mode: 'onChange', // Validate on change for real-time feedback
  });

  // Watch languages array
  const languages = form.watch('languages') || [];

  // Add language handler
  const addLanguage = (language: Omit<Language, 'badgeColor' | 'badgeTextColor'>) => {
    const newLanguage: Language = {
      ...language,
      badgeColor: '#0D2E610D',
      badgeTextColor: '#0D2E61'
    };

    const currentLanguages = form.getValues('languages') || [];

    form.setValue('languages', [...currentLanguages, newLanguage], {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  // Remove language handler
  const removeLanguage = (index: number) => {
    const currentLanguages = form.getValues('languages') || [];
    const updatedLanguages = currentLanguages.filter((_, i) => i !== index);
    
    form.setValue('languages', updatedLanguages, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  // Update language handler
  const updateLanguage = (index: number, updates: Partial<Language>) => {
    const currentLanguages = form.getValues('languages') || [];
    const updatedLanguages = currentLanguages.map((lang, i) => 
      i === index ? { ...lang, ...updates } : lang
    );
    
    form.setValue('languages', updatedLanguages, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  // Computed values
  const isFormValid = form.formState.isValid;
  const canAddMore = languages.length < 3;
  const hasMinimumLanguages = languages.length >= 1;

  const contextValue: LanguageContextType = {
    form,
    addLanguage,
    removeLanguage,
    updateLanguage,
    isFormValid,
    languages,
    canAddMore,
    hasMinimumLanguages,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the context
export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}

// Export the context for advanced use cases
export { LanguageContext };
