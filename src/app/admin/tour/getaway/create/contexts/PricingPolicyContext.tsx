'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useForm, UseFormReturn, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod validation schemas
const packageSchema = z.object({
  name: z.string().min(1, 'Package name is required'),
  minTravelers: z.number().min(1, 'Minimum travelers must be at least 1'),
  maxTravelers: z.number().min(1, 'Maximum travelers must be at least 1'),
  pricePerPerson: z.number().min(0, 'Price must be 0 or greater'),
  adults: z.number().min(0, 'Adult price must be 0 or greater'),
  kids: z.number().min(0, 'Kids price must be 0 or greater'),
  infants: z.number().min(0, 'Infant price must be 0 or greater'),
});

export const pricingPolicySchema = z.object({
  // Age Requirements
  minimumAge: z.enum(['0', '3', '5', '12', '18']),
  
  // Children Pricing
  infantPricing: z.enum(['free', 'discounted']),
  infantDiscount: z.number().min(0).max(100).optional(),
  kidsPricing: z.enum(['free', 'discounted']),
  kidsDiscount: z.number().min(0).max(100).optional(),
  
  // Pricing Type
  pricingType: z.enum(['fixed', 'package']),
  
  // Fixed Pricing
  fixedPricePerPerson: z.number().min(0, 'Price must be 0 or greater').optional(),
  
  // Package Pricing
  packages: z.array(packageSchema).min(1, 'At least one package is required').optional(),
});

export type PricingPolicyFormData = z.infer<typeof pricingPolicySchema>;

// Default values
const defaultValues: PricingPolicyFormData = {
  minimumAge: '0',
  infantPricing: 'free',
  infantDiscount: 50,
  kidsPricing: 'free',
  kidsDiscount: 50,
  pricingType: 'package',
  fixedPricePerPerson: 65,
  packages: [
    {
      name: '',
      minTravelers: 1,
      maxTravelers: 1,
      pricePerPerson: 0,
      adults: 0,
      kids: 0,
      infants: 0
    }
  ]
};

interface PricingPolicyContextType {
  form: UseFormReturn<PricingPolicyFormData>;
  packagesArray: ReturnType<typeof useFieldArray<PricingPolicyFormData, 'packages'>>;

  // Computed values for conditional logic
  isInfantAllowed: boolean;
  isKidsAllowed: boolean;
  shouldShowInfantPricing: boolean;
  shouldShowKidsPricing: boolean;
}

const PricingPolicyContext = createContext<PricingPolicyContextType | undefined>(undefined);

interface PricingPolicyProviderProps {
  children: ReactNode;
}

export function PricingPolicyProvider({ children }: PricingPolicyProviderProps) {
  const form = useForm<PricingPolicyFormData>({
    resolver: zodResolver(pricingPolicySchema),
    defaultValues,
    mode: 'onChange',
  });

  const packagesArray = useFieldArray({
    control: form.control,
    name: 'packages'
  });

  const minimumAge = form.watch('minimumAge');

  // Computed values for conditional logic
  const isInfantAllowed = minimumAge === '0'; // Only allow infants if minimum age is 0
  const isKidsAllowed = ['0', '3', '5'].includes(minimumAge); // Allow kids if minimum age is 0, 3, or 5
  const shouldShowInfantPricing = isInfantAllowed;
  const shouldShowKidsPricing = isKidsAllowed;

  const contextValue: PricingPolicyContextType = {
    form,
    packagesArray,
    isInfantAllowed,
    isKidsAllowed,
    shouldShowInfantPricing,
    shouldShowKidsPricing,
  };

  return (
    <PricingPolicyContext.Provider value={contextValue}>
      {children}
    </PricingPolicyContext.Provider>
  );
}

export function usePricingPolicy() {
  const context = useContext(PricingPolicyContext);
  if (context === undefined) {
    throw new Error('usePricingPolicy must be used within a PricingPolicyProvider');
  }
  return context;
}
