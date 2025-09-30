'use client';

import TourFormManager from './components/TourFormManager';
import { BasicInformationProvider } from './contexts/BasicInformationContext';
import { MealDetailsProvider } from './contexts/MealDetailsContext';
import { PricingPolicyProvider } from './contexts/PricingPolicyContext';
import { TourDetailsProvider } from './contexts/TourDetailsContext';
import { FoodDataProvider } from './contexts/FoodDataContext';

export default function CreateTourPage() {
  return (
    <FoodDataProvider>
      <BasicInformationProvider>
        <MealDetailsProvider>
          <TourDetailsProvider>
            <PricingPolicyProvider>
              <TourFormManager />
            </PricingPolicyProvider>
          </TourDetailsProvider>
        </MealDetailsProvider>
      </BasicInformationProvider>
    </FoodDataProvider>
  );
}