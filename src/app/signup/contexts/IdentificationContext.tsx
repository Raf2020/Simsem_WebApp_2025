'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// File validation schema
const fileSchema = z.object({
  file: z.any(), // File object
  url: z.string().optional(), // Preview URL
  name: z.string(),
  size: z.number(),
  type: z.string(),
});

// Zod validation schema
export const identificationSchema = z.object({
  // Profile Information
  profilePhoto: fileSchema.optional(),
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required').min(10, 'Please enter a valid phone number'),
  country: z.string().min(1, 'Please select your country'),
  city: z.string().min(1, 'Please select your state/province'),
  introduction: z.string().min(1, 'Introduction is required').min(50, 'Please write at least 50 characters about yourself'),

  // Identification Documents
  idCardFrontSide: fileSchema.optional().refine(
    (file) => file !== undefined && file !== null,
    'Please upload the front side of your ID card'
  ),
  idCardBackSide: fileSchema.optional().refine(
    (file) => file !== undefined && file !== null,
    'Please upload the back side of your ID card'
  ),

  // Certification (Optional)
  isCertifiedGuide: z.boolean(),
  tourGuideCertificate: fileSchema.optional(),
}).refine(
  (data) => {
    // If certified guide is checked, certificate is required
    if (data.isCertifiedGuide && !data.tourGuideCertificate) {
      return false;
    }
    return true;
  },
  {
    message: 'Please upload your tour guide certificate to verify your certification',
    path: ['tourGuideCertificate'],
  }
);

// Types
export type FileData = z.infer<typeof fileSchema>;
export type IdentificationFormData = z.infer<typeof identificationSchema>;

export interface IdentificationContextType {
  // React Hook Form instance
  form: UseFormReturn<IdentificationFormData>;

  // Custom actions
  handleFileUpload: (fieldName: keyof IdentificationFormData, file: File) => void;
  removeFile: (fieldName: keyof IdentificationFormData) => void;
  toggleCertification: () => void;

  // Computed values
  isFormValid: boolean;
  isCertifiedGuide: boolean;
}

// Create context
const IdentificationContext = createContext<IdentificationContextType | undefined>(undefined);

// Provider component
interface IdentificationProviderProps {
  children: ReactNode;
}

export function IdentificationProvider({ children }: IdentificationProviderProps) {
  const form = useForm<IdentificationFormData>({
    resolver: zodResolver(identificationSchema),
    defaultValues: {
      profilePhoto: undefined,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      introduction: '',
      idCardFrontSide: undefined,
      idCardBackSide: undefined,
      isCertifiedGuide: false,
      tourGuideCertificate: undefined,
    } as IdentificationFormData,
    mode: 'onChange', // Validate on change for real-time feedback
  });

  // Custom file upload handler
  const handleFileUpload = (fieldName: keyof IdentificationFormData, file: File) => {
    const fileData: FileData = {
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
    };

    form.setValue(fieldName as any, fileData, {
      shouldValidate: true,
      shouldDirty: true
    });

    console.log(`� File stored locally for ${fieldName}:`, file.name);
  };

  // Remove file handler
  const removeFile = (fieldName: keyof IdentificationFormData) => {
    const currentFile = form.getValues(fieldName as any);
    if (currentFile && typeof currentFile === 'object' && 'url' in currentFile) {
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(currentFile.url);
    }

    form.setValue(fieldName as any, undefined, {
      shouldValidate: true,
      shouldDirty: true
    });

    console.log(`🗑️ File removed locally for ${fieldName}`);
  };

  // Toggle certification handler
  const toggleCertification = () => {
    const currentValue = form.getValues('isCertifiedGuide');
    const newValue = !currentValue;
    
    form.setValue('isCertifiedGuide', newValue, {
      shouldValidate: true,
      shouldDirty: true
    });

    // If unchecking certification, remove the certificate file
    if (!newValue) {
      removeFile('tourGuideCertificate');
    }
  };

  // Computed values
  const isFormValid = form.formState.isValid;
  const isCertifiedGuide = form.watch('isCertifiedGuide');

  const contextValue: IdentificationContextType = {
    form,
    handleFileUpload,
    removeFile,
    toggleCertification,
    isFormValid,
    isCertifiedGuide,
  };

  return (
    <IdentificationContext.Provider value={contextValue}>
      {children}
    </IdentificationContext.Provider>
  );
}

// Custom hook to use the context
export function useIdentification() {
  const context = useContext(IdentificationContext);
  
  if (context === undefined) {
    throw new Error('useIdentification must be used within an IdentificationProvider');
  }
  
  return context;
}

// Export the context for advanced use cases
export { IdentificationContext };
