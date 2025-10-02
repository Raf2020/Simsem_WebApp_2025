'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Payment form schema
export const paymentFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').min(2, 'Full name must be at least 2 characters'),
  address: z.string().min(1, 'Address is required').min(5, 'Address must be at least 5 characters'),
  bankName: z.string().min(1, 'Bank name is required'),
  iban: z.string().min(1, 'IBAN is required').min(15, 'IBAN must be at least 15 characters'),
  swiftBic: z.string().min(1, 'SWIFT/BIC is required').min(8, 'SWIFT/BIC must be at least 8 characters'),
  bankAddress: z.string().min(1, 'Bank address is required').min(5, 'Bank address must be at least 5 characters'),
}).refine((data) => {
  // Custom validation to ensure IBAN is verified
  return true; // We'll handle this in the context
}, {
  message: 'IBAN must be verified before proceeding',
  path: ['iban']
});

// Types
export type PaymentFormData = z.infer<typeof paymentFormSchema>;

// IBAN verification response type
interface IBANVerificationResponse {
  result: string; // JSON string containing verification data
}

interface IBANVerificationData {
  valid: boolean;
  iban: string;
  countryCode: string;
  bban: string;
  electronicFormat: string;
}

export interface PaymentContextType {
  // React Hook Form instance
  form: UseFormReturn<PaymentFormData>;
  
  // IBAN verification state
  isVerifyingIban: boolean;
  ibanVerified: boolean;
  ibanVerificationData: IBANVerificationData | null;
  
  // Custom actions
  verifyIban: (iban: string) => Promise<void>;
  
  // Computed values
  isFormValid: boolean;
  canProceed: boolean;
}

// API function to verify IBAN
const verifyIbanAPI = async (iban: string): Promise<IBANVerificationData> => {
  const cleanIban = iban.replace(/\s/g, ''); // Remove spaces
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/functions/verifyIBAN?iban=${cleanIban}`, {
    method: 'POST',
    headers: {
      'accept': '*/*',
      'X-Parse-Application-Id': process.env.NEXT_PUBLIC_APPLICATION_ID!,
      'X-Parse-REST-API-Key': process.env.NEXT_PUBLIC_REST_API_KEY!,
    },
    body: ''
  });
  
  if (!response.ok) {
    throw new Error('Failed to verify IBAN');
  }
  
  const data: IBANVerificationResponse = await response.json();
  const verificationData: IBANVerificationData = JSON.parse(data.result);
  
  return verificationData;
};

// Create context
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Provider component
interface PaymentProviderProps {
  children: ReactNode;
}

export function PaymentProvider({ children }: PaymentProviderProps) {
  // IBAN verification state
  const [isVerifyingIban, setIsVerifyingIban] = useState(false);
  const [ibanVerified, setIbanVerified] = useState(false);
  const [ibanVerificationData, setIbanVerificationData] = useState<IBANVerificationData | null>(null);
  const [lastVerifiedIban, setLastVerifiedIban] = useState<string>('');

  // Form setup
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      fullName: '',
      address: '',
      bankName: '',
      iban: '',
      swiftBic: '',
      bankAddress: '',
    },
    mode: 'onChange',
  });

  // Watch IBAN field for changes and reset verification
  const ibanValue = form.watch('iban');
  useEffect(() => {
    // Only reset verification when IBAN changes and it's different from the last verified IBAN
    if (ibanValue !== lastVerifiedIban) {
      setIbanVerified(false);
      setIbanVerificationData(null);
    }
  }, [ibanValue, lastVerifiedIban]);

  // Verify IBAN function
  const verifyIban = async (iban: string) => {
    if (!iban.trim()) return;

    setIsVerifyingIban(true);
    setIbanVerified(false);
    setIbanVerificationData(null);

    try {
      const verificationData = await verifyIbanAPI(iban);

      if (verificationData.valid) {
        setIbanVerified(true);
        setIbanVerificationData(verificationData);
        setLastVerifiedIban(verificationData.iban);
        // Update form with formatted IBAN
        form.setValue('iban', verificationData.iban, { shouldValidate: true });
      } else {
        setIbanVerified(false);
        setLastVerifiedIban('');
        form.setError('iban', { message: 'Invalid IBAN' });
      }
    } catch (error) {
      console.error('IBAN verification error:', error);
      setIbanVerified(false);
      setLastVerifiedIban('');
      form.setError('iban', { message: 'Failed to verify IBAN. Please try again.' });
    } finally {
      setIsVerifyingIban(false);
    }
  };

  // Computed values
  const isFormValid = form.formState.isValid;
  const canProceed = isFormValid && ibanVerified;

  const contextValue: PaymentContextType = {
    form,
    isVerifyingIban,
    ibanVerified,
    ibanVerificationData,
    verifyIban,
    isFormValid,
    canProceed,
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
}

// Custom hook to use the context
export function usePayment() {
  const context = useContext(PaymentContext);
  
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  
  return context;
}

// Export the context for advanced use cases
export { PaymentContext };
