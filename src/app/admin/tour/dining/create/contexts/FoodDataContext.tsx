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
  const response = await fetch(url, {
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
  
  const { data: foodItems = [], error, isLoading, mutate } = useSWR(
    apiUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

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
