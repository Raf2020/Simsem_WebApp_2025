'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import useSWR from 'swr';

// Types based on the API response structure
interface ParseFile {
  __type: 'File';
  name: string;
  url: string;
}

interface RawFoodItem {
  objectId: string;
  type: string;
  name: string;
  ingredients: string;
  image: ParseFile;
  country: string;
  course: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  results: RawFoodItem[];
}

// Transformed food item for UI
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  image: string;
  dietaryTags: string[];
  category: string;
  country: string;
}

interface FoodDataContextType {
  foodItems: FoodItem[];
  isLoading: boolean;
  error: any;
  getItemsByCategory: (category: string) => FoodItem[];
  getItemsByType: (type: string) => FoodItem[];
  getItemsByCategoryAndType: (category: string, type: string) => FoodItem[];
  searchItems: (searchQuery: string, category?: string, type?: string) => Promise<FoodItem[]>;
  mutate: () => void;
  fetchData: () => void; // Manual fetch trigger
}

const FoodDataContext = createContext<FoodDataContextType | undefined>(undefined);

// API configuration from environment variables
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  applicationId: process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID,
  restApiKey: process.env.NEXT_PUBLIC_PARSE_REST_API_KEY,
};

// Fetcher function for SWR
const fetcher = async (url: string): Promise<FoodItem[]> => {
  console.log('Fetching from URL:', url);

  const response = await fetch(url, {
    headers: {
      'accept': '*/*',
      'X-Parse-Application-Id': API_CONFIG.applicationId!,
      'X-Parse-REST-API-Key': API_CONFIG.restApiKey!,
    },
  });

  console.log('Response status:', response.status);
  console.log('Response ok:', response.ok);

  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Check if response has content
  const contentLength = response.headers.get('content-length');
  console.log('Content-Length:', contentLength);

  let data: ApiResponse;
  try {
    data = await response.json();
    console.log('Parsed data:', data);
  } catch (parseError) {
    console.error('JSON parse error:', parseError);
    throw new Error('Failed to parse response as JSON');
  }

  if (!data.results || !Array.isArray(data.results)) {
    console.error('Invalid data structure:', data);
    throw new Error('Invalid response structure');
  }

  // Transform the data to match our UI interface
  const transformedData = data.results.map((item: RawFoodItem): FoodItem => ({
    id: item.objectId,
    name: item.name,
    description: item.ingredients,
    image: item.image?.url || '/images/temp-dish.png', // Handle missing image
    dietaryTags: [item.type.toUpperCase()],
    category: item.course === 'main' ? 'main-course' : item.course,
    country: item.country,
  }));

  console.log('Transformed data count:', transformedData.length);
  return transformedData;
};

// Build the API URL with query parameters
const buildApiUrl = (country: string = 'Egypt', limit: number = 500, searchQuery?: string, course?: string, type?: string) => {
  const whereConditions: any = { country };

  if (searchQuery) {
    whereConditions.name = {
      $regex: searchQuery,
      $options: 'i' // Case insensitive
    };
  }

  if (course) {
    whereConditions.course = course;
  }

  if (type) {
    whereConditions.type = type;
  }

  const where = encodeURIComponent(JSON.stringify(whereConditions));
  return `${API_CONFIG.baseUrl}/classes/OfferedDish?where=${where}&limit=${limit}`;
};

interface FoodDataProviderProps {
  children: ReactNode;
  country?: string;
  limit?: number;
}

export function FoodDataProvider({
  children,
  country = 'Egypt',
  limit = 500
}: FoodDataProviderProps) {
  const apiUrl = buildApiUrl(country, limit);

  // Don't fetch automatically - only fetch when explicitly requested
  const { data: foodItems = [], error, isLoading, mutate } = useSWR(
    null, // Set to null to prevent automatic fetching
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
      errorRetryCount: 3,
      errorRetryInterval: 1000,
      onError: (error) => {
        console.error('SWR Error:', error);
      },
      onSuccess: (data) => {
        console.log('SWR Success, data length:', data?.length);
      }
    }
  );

  // Manual fetch function
  const fetchData = () => {
    console.log('Manual fetch triggered');
    mutate(fetcher(apiUrl));
  };

  // Helper functions
  const getItemsByCategory = (category: string): FoodItem[] => {
    return foodItems.filter(item => item.category === category);
  };

  const getItemsByType = (type: string): FoodItem[] => {
    return foodItems.filter(item => 
      item.dietaryTags.some(tag => tag.toLowerCase() === type.toLowerCase())
    );
  };

  const getItemsByCategoryAndType = (category: string, type: string): FoodItem[] => {
    return foodItems.filter(item =>
      item.category === category &&
      item.dietaryTags.some(tag => tag.toLowerCase() === type.toLowerCase())
    );
  };

  // Search function that makes API call
  const searchItems = async (searchQuery: string, category?: string, type?: string): Promise<FoodItem[]> => {
    try {
      const course = category === 'main-course' ? 'main' : category;
      const searchUrl = buildApiUrl(country, limit, searchQuery, course, type);

      const response = await fetch(searchUrl, {
        headers: {
          'accept': '*/*',
          'X-Parse-Application-Id': API_CONFIG.applicationId!,
          'X-Parse-REST-API-Key': API_CONFIG.restApiKey!,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      // Transform the data to match our UI interface
      return data.results.map((item: RawFoodItem): FoodItem => ({
        id: item.objectId,
        name: item.name,
        description: item.ingredients,
        image: item.image.url,
        dietaryTags: [item.type.toUpperCase()],
        category: item.course === 'main' ? 'main-course' : item.course,
        country: item.country,
      }));
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  };

  const contextValue: FoodDataContextType = {
    foodItems,
    isLoading,
    error,
    getItemsByCategory,
    getItemsByType,
    getItemsByCategoryAndType,
    searchItems,
    mutate,
    fetchData,
  };

  return (
    <FoodDataContext.Provider value={contextValue}>
      {children}
    </FoodDataContext.Provider>
  );
}

// Custom hook to use the food data context
export function useFoodData(): FoodDataContextType {
  const context = useContext(FoodDataContext);
  if (context === undefined) {
    throw new Error('useFoodData must be used within a FoodDataProvider');
  }
  return context;
}

// Export types for use in other components
export type { RawFoodItem, ApiResponse };
