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

  // Upload state
  isUploadingAvatar: boolean;
}

// Create context
const IdentificationContext = createContext<IdentificationContextType | undefined>(undefined);

// Provider component
interface IdentificationProviderProps {
  children: ReactNode;
}

export function IdentificationProvider({ children }: IdentificationProviderProps) {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string>('');

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
  const handleFileUpload = async (fieldName: keyof IdentificationFormData, file: File) => {
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

    // If this is a profile photo upload, call the API
    if (fieldName === 'profilePhoto') {
      setIsUploadingAvatar(true);
      try {
        console.log('🚀 Uploading avatar to API...');

        // Generate a unique filename with timestamp
        const timestamp = Date.now();
        const fileExtension = file.name.split('.').pop() || 'jpeg';
        const fileName = `avatar_${timestamp}.${fileExtension}`;
        const sampleId = 'sampleId'; // You can replace this with actual user ID when available

        const uploadUrl = `${process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL}/profiles/${sampleId}/avatar/${fileName}`;

        const response = await fetch(uploadUrl, {
          method: 'PUT',
          headers: {
            'AccessKey': process.env.NEXT_PUBLIC_ACCESS_KEY!,
            'Content-Type': 'application/octet-stream',
          },
          body: file
        });

        if (response.ok) {
          console.log('✅ Avatar upload successful!');
          console.log('📁 Upload URL:', uploadUrl);
          console.log('📊 Response status:', response.status);
          setUploadedAvatarUrl(uploadUrl);
        } else {
          console.error('❌ Avatar upload failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('❌ Avatar upload error:', error);
      } finally {
        setIsUploadingAvatar(false);
      }
    }
  };

  // Remove file handler
  const removeFile = async (fieldName: keyof IdentificationFormData) => {
    const currentFile = form.getValues(fieldName as any);
    if (currentFile && typeof currentFile === 'object' && 'url' in currentFile) {
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(currentFile.url);
    }

    // If this is a profile photo and we have an uploaded URL, delete it from the server
    if (fieldName === 'profilePhoto' && uploadedAvatarUrl) {
      try {
        console.log('🗑️  Deleting avatar from API...');
        console.log('📁 Delete URL:', uploadedAvatarUrl);

        const response = await fetch(uploadedAvatarUrl, {
          method: 'DELETE',
          headers: {
            'accept': '*/*',
            'X-Parse-Application-Id': process.env.NEXT_PUBLIC_APPLICATION_ID!,
            'X-Parse-REST-API-Key': process.env.NEXT_PUBLIC_REST_API_KEY!,
            'AccessKey': process.env.NEXT_PUBLIC_ACCESS_KEY!
          }
        });

        if (response.ok) {
          console.log('✅ Avatar deleted successfully from server!');
          console.log('📊 Response status:', response.status);
          setUploadedAvatarUrl('');
        } else {
          console.error('❌ Failed to delete avatar from server:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('❌ Avatar deletion error:', error);
      }
    }

    form.setValue(fieldName as any, undefined, {
      shouldValidate: true,
      shouldDirty: true
    });
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
    isUploadingAvatar,
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
