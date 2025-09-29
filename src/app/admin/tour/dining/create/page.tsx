'use client';

import TourFormManager from './components/TourFormManager';
import { BasicInformationProvider } from './contexts/BasicInformationContext';
import { MealDetailsProvider } from './contexts/MealDetailsContext';
import { PricingPolicyProvider } from './contexts/PricingPolicyContext';
import { TourDetailsProvider } from './contexts/TourDetailsContext';

export default function CreateTourPage() {
  return (
    <BasicInformationProvider>
      <MealDetailsProvider>
        <TourDetailsProvider>
          <PricingPolicyProvider>
            <TourFormManager />
          </PricingPolicyProvider>
        </TourDetailsProvider>
      </MealDetailsProvider>
    </BasicInformationProvider>
  );
}