'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

// Service types
export type ServiceType = 'local-living' | 'getaway' | 'dining';

export interface ServicesContextType {
  selectedServices: ServiceType[];
  toggleService: (serviceId: ServiceType) => void;
  isServiceSelected: (serviceId: ServiceType) => boolean;
  hasSelectedServices: boolean;
  
  // Computed flags based on selected services
  isTourGuide: boolean;
  isFamilyHost: boolean;
  isLocalSeller: boolean;
}

// Create context
const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

// Provider component
interface ServicesProviderProps {
  children: ReactNode;
}

export function ServicesProvider({ children }: ServicesProviderProps) {
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);

  const toggleService = (serviceId: ServiceType) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const isServiceSelected = (serviceId: ServiceType) => {
    return selectedServices.includes(serviceId);
  };

  const hasSelectedServices = selectedServices.length > 0;

  // Compute flags based on selected services
  const isTourGuide = selectedServices.includes('local-living') || selectedServices.includes('getaway');
  const isFamilyHost = selectedServices.includes('dining');
  const isLocalSeller = false; // Always false based on your requirements

  const contextValue: ServicesContextType = {
    selectedServices,
    toggleService,
    isServiceSelected,
    hasSelectedServices,
    isTourGuide,
    isFamilyHost,
    isLocalSeller,
  };

  return (
    <ServicesContext.Provider value={contextValue}>
      {children}
    </ServicesContext.Provider>
  );
}

// Custom hook to use the context
export function useServices() {
  const context = useContext(ServicesContext);
  
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  
  return context;
}

// Export the context for advanced use cases
export { ServicesContext };
