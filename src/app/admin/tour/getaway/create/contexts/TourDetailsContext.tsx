'use client';

import { createContext, useContext, ReactNode, useCallback } from 'react';
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
    unit: z.enum(['Day', 'Week']),
  }),
  // Dynamic itinerary structure - each day gets its own field
  itinerary: z.record(z.string(), z.array(itineraryItemSchema)).optional(),
  
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
  guidelinesArray: any;
  pickupPointsArray: any;

  // Helper functions for new itinerary structure
  addItineraryItem: (dayNumber: number) => void;
  removeItineraryItem: (dayNumber: number, itemIndex: number) => void;
  getItineraryDay: (dayNumber: number) => ItineraryItem[];
  initializeDay: (dayNumber: number) => void;
  cleanupExtraDays: (maxDays: number) => void;

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
  itinerary: {
    day1: [
      {
        time: '',
        activity: '',
        description: '',
      },
    ],
  },
  guidelines: [
    {
      title: '',
      details: '',
    },
  ],
  pickupPoints: [
    {
      name: 'Pickup from any hotel',
      address: '',
    },
    {
      name: 'Pickup from any airport',
      address: '',
    },
    {
      name: 'Pickup from a specific location',
      address: '',
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

  const guidelinesArray = useFieldArray({
    control: form.control,
    name: 'guidelines',
  });

  const pickupPointsArray = useFieldArray({
    control: form.control,
    name: 'pickupPoints',
  });

  // Helper functions for itinerary management with new structure
  const addItineraryItem = (dayNumber: number) => {
    const dayKey = `day${dayNumber}`;
    const currentDayItems = form.getValues(`itinerary.${dayKey}`) || [];
    const newItem = {
      time: '',
      activity: '',
      description: '',
    };

    form.setValue(`itinerary.${dayKey}`, [...currentDayItems, newItem], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeItineraryItem = (dayNumber: number, itemIndex: number) => {
    const dayKey = `day${dayNumber}`;
    const currentDayItems = form.getValues(`itinerary.${dayKey}`) || [];
    const updatedItems = currentDayItems.filter((_, index) => index !== itemIndex);

    form.setValue(`itinerary.${dayKey}`, updatedItems, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Helper to get itinerary items for a specific day
  const getItineraryDay = (dayNumber: number) => {
    const dayKey = `day${dayNumber}`;
    return form.watch(`itinerary.${dayKey}`) || [];
  };

  // Helper to initialize a new day if it doesn't exist
  const initializeDay = useCallback((dayNumber: number) => {
    const dayKey = `day${dayNumber}`;
    const existingDay = form.getValues(`itinerary.${dayKey}`);

    if (!existingDay) {
      form.setValue(`itinerary.${dayKey}`, [
        {
          time: '',
          activity: '',
          description: '',
        },
      ], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [form]);

  // Helper to clean up extra days when duration is reduced
  const cleanupExtraDays = useCallback((maxDays: number) => {
    const currentItinerary = form.getValues('itinerary') || {};
    const updatedItinerary = { ...currentItinerary };

    // Remove days beyond the new duration
    Object.keys(updatedItinerary).forEach(dayKey => {
      const dayNumber = parseInt(dayKey.replace('day', ''));
      if (dayNumber > maxDays) {
        delete updatedItinerary[dayKey];
      }
    });

    form.setValue('itinerary', updatedItinerary, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [form]);

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
    guidelinesArray,
    pickupPointsArray,
    addItineraryItem,
    removeItineraryItem,
    getItineraryDay,
    initializeDay,
    cleanupExtraDays,
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
