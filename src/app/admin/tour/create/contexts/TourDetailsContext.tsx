'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useForm, UseFormReturn, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod validation schemas
const imageFileSchema = z.object({
  file: z.any(), // File object
  url: z.string(), // Preview URL or uploaded URL
  name: z.string(),
  size: z.number(),
  type: z.string(),
});

const itineraryItemSchema = z.object({
  time: z.string().min(1, 'Time is required'),
  activity: z.string().min(1, 'Activity/Location is required'),
  description: z.string().min(1, 'Description is required'),
});

const itineraryDaySchema = z.object({
  dayNumber: z.number().min(1),
  items: z.array(itineraryItemSchema).min(1, 'At least one activity is required per day'),
});

const guidelineSchema = z.object({
  title: z.string().min(1, 'Guideline title is required'),
  details: z.string().min(1, 'Guideline details are required'),
});

const pickupPointSchema = z.object({
  name: z.string().min(1, 'Pickup point name is required'),
  address: z.string().min(1, 'Address is required'),
  isSelected: z.boolean(),
});

export const tourDetailsSchema = z.object({
  // Basic Info Section
  whatToExpect: z.string().min(10, 'What to expect must be at least 10 characters'),
  coverPhotos: z.array(imageFileSchema).optional(), // Image files with metadata
  galleryPhotos: z.array(imageFileSchema).optional(), // Image files with metadata
  
  // Inclusions Section
  inclusions: z.array(z.string()).min(1, 'At least one inclusion is required'),
  exclusions: z.array(z.string()).min(1, 'At least one exclusion is required'),
  
  // Itinerary Section
  tourDuration: z.object({
    value: z.number().min(1, 'Duration must be at least 1'),
    unit: z.enum(['Day', 'Days', 'Hour', 'Hours']),
  }),
  itinerary: z.array(itineraryDaySchema).min(1, 'At least one day is required'),
  
  // Things to Know Section
  guidelines: z.array(guidelineSchema).min(1, 'At least one guideline is required'),
  
  // Pickup Points Section
  pickupPoints: z.array(pickupPointSchema).min(1, 'At least one pickup point is required'),
});

// Types
export type ImageFile = z.infer<typeof imageFileSchema>;
export type TourDetailsFormData = z.infer<typeof tourDetailsSchema>;
export type ItineraryItem = z.infer<typeof itineraryItemSchema>;
export type ItineraryDay = z.infer<typeof itineraryDaySchema>;
export type Guideline = z.infer<typeof guidelineSchema>;
export type PickupPoint = z.infer<typeof pickupPointSchema>;

export interface TourDetailsContextType {
  // React Hook Form instance
  form: UseFormReturn<TourDetailsFormData>;

  // Field Arrays for dynamic lists (arrays of objects)
  coverPhotosArray: any;
  galleryPhotosArray: any;
  itineraryArray: any;
  guidelinesArray: any;
  pickupPointsArray: any;
  
  // Helper functions
  addItineraryItem: (dayIndex: number) => void;
  removeItineraryItem: (dayIndex: number, itemIndex: number) => void;
  addItineraryDay: () => void;
  removeItineraryDay: (dayIndex: number) => void;
  
  // File upload helpers
  addCoverPhoto: (imageFile: ImageFile) => void;
  removeCoverPhoto: (index: number) => void;
  addGalleryPhoto: (imageFile: ImageFile) => void;
  removeGalleryPhoto: (index: number) => void;
  createImageFile: (file: File) => ImageFile;

  // Computed values
  isFormValid: boolean;
}

// Default values
const defaultValues: TourDetailsFormData = {
  whatToExpect: '',
  coverPhotos: [],
  galleryPhotos: [],
  inclusions: [],
  exclusions: [],
  tourDuration: {
    value: 1,
    unit: 'Day',
  },
  itinerary: [
    {
      dayNumber: 1,
      items: [
        {
          time: '',
          activity: '',
          description: '',
        },
      ],
    },
  ],
  guidelines: [
    {
      title: 'Dress Code',
      details: '• Opt for modest but breathable clothing as we\'ll be visiting religious sites.\n• Wear comfortable shoes\n\nPress \'Enter\' to add a new detail',
    },
  ],
  pickupPoints: [
    {
      name: 'Pickup from any airport',
      address: 'Egypt Airport, Egypt',
      isSelected: true,
    },
  ],
};

// Create context
const TourDetailsContext = createContext<TourDetailsContextType | undefined>(undefined);

// Provider component
interface TourDetailsProviderProps {
  children: ReactNode;
}

export function TourDetailsProvider({ children }: TourDetailsProviderProps) {
  const form = useForm<TourDetailsFormData>({
    resolver: zodResolver(tourDetailsSchema),
    defaultValues,
    mode: 'onChange',
  });

  // Field arrays for dynamic lists (arrays of objects)
  const coverPhotosArray = useFieldArray({
    control: form.control,
    name: 'coverPhotos',
  });

  const galleryPhotosArray = useFieldArray({
    control: form.control,
    name: 'galleryPhotos',
  });

  const itineraryArray = useFieldArray({
    control: form.control,
    name: 'itinerary',
  });

  const guidelinesArray = useFieldArray({
    control: form.control,
    name: 'guidelines',
  });

  const pickupPointsArray = useFieldArray({
    control: form.control,
    name: 'pickupPoints',
  });

  // Helper functions for itinerary management
  const addItineraryItem = (dayIndex: number) => {
    const currentDay = form.getValues(`itinerary.${dayIndex}`);
    const newItem: ItineraryItem = {
      time: '',
      activity: '',
      description: '',
    };
    
    form.setValue(`itinerary.${dayIndex}.items`, [...currentDay.items, newItem], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeItineraryItem = (dayIndex: number, itemIndex: number) => {
    const currentDay = form.getValues(`itinerary.${dayIndex}`);
    const updatedItems = currentDay.items.filter((_, index) => index !== itemIndex);
    
    form.setValue(`itinerary.${dayIndex}.items`, updatedItems, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const addItineraryDay = () => {
    const currentItinerary = form.getValues('itinerary');
    const newDay: ItineraryDay = {
      dayNumber: currentItinerary.length + 1,
      items: [
        {
          time: '',
          activity: '',
          description: '',
        },
      ],
    };
    
    itineraryArray.append(newDay);
  };

  const removeItineraryDay = (dayIndex: number) => {
    itineraryArray.remove(dayIndex);
    
    // Update day numbers for remaining days
    const currentItinerary = form.getValues('itinerary');
    currentItinerary.forEach((_, index) => {
      if (index >= dayIndex) {
        form.setValue(`itinerary.${index}.dayNumber`, index + 1);
      }
    });
  };

  // File upload helpers
  const createImageFile = (file: File): ImageFile => {
    return {
      file,
      url: URL.createObjectURL(file), // Create preview URL
      name: file.name,
      size: file.size,
      type: file.type,
    };
  };

  const addCoverPhoto = (imageFile: ImageFile) => {
    coverPhotosArray.append(imageFile);
  };

  const removeCoverPhoto = (index: number) => {
    coverPhotosArray.remove(index);
  };

  const addGalleryPhoto = (imageFile: ImageFile) => {
    galleryPhotosArray.append(imageFile);
  };

  const removeGalleryPhoto = (index: number) => {
    galleryPhotosArray.remove(index);
  };

  // Computed values
  const isFormValid = form.formState.isValid;

  const contextValue: TourDetailsContextType = {
    form,
    coverPhotosArray,
    galleryPhotosArray,
    itineraryArray,
    guidelinesArray,
    pickupPointsArray,
    addItineraryItem,
    removeItineraryItem,
    addItineraryDay,
    removeItineraryDay,
    addCoverPhoto,
    removeCoverPhoto,
    addGalleryPhoto,
    removeGalleryPhoto,
    createImageFile,
    isFormValid,
  };

  return (
    <TourDetailsContext.Provider value={contextValue}>
      {children}
    </TourDetailsContext.Provider>
  );
}

// Custom hook to use the context
export function useTourDetails() {
  const context = useContext(TourDetailsContext);
  
  if (context === undefined) {
    throw new Error('useTourDetails must be used within a TourDetailsProvider');
  }
  
  return context;
}

// Export the context for advanced use cases
export { TourDetailsContext };
