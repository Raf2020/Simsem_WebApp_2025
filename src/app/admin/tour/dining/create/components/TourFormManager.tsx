'use client';

import { useState } from 'react';
import { Container, Paper, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import CreateTourHeader from './CreateTourHeader';
import BasicInformationStep from './BasicInformationStep';
import MealDetailsStep from './MealDetailsStep';
import TourDetailsStep from './TourDetailsStep';
import PricingPolicy from './PricingPolicy';
import { useBasicInformation } from '../contexts/BasicInformationContext';
import { useMealDetails } from '../contexts/MealDetailsContext';
import { useTourDetails } from '../contexts/TourDetailsContext';
import { usePricingPolicy } from '../contexts/PricingPolicyContext';

type TourStep = 'basic' | 'meal' | 'details' | 'pricing';

export default function TourFormManager() {
  const [currentStep, setCurrentStep] = useState<TourStep>('basic');
  
  // Access all form contexts
  const { form: basicForm } = useBasicInformation();
  const { form: mealForm } = useMealDetails();
  const { form: detailsForm } = useTourDetails();
  const { form: pricingForm } = usePricingPolicy();

  const handleStepChange = (nextStep: TourStep) => {
    setCurrentStep(nextStep);
  };

  const handlePreview = () => {
    // Handle preview functionality
    console.log('Preview clicked');
  };

  const compileFormData = () => {
    // Get all form data
    const basicData = basicForm.getValues();
    const mealData = mealForm.getValues();
    const detailsData = detailsForm.getValues();
    const pricingData = pricingForm.getValues();

    // Helper function to format itinerary
    const formatItinerary = (itinerary: Record<string, any[]> | undefined): string[] => {
      if (!itinerary) return [];
      
      const formattedItinerary: string[] = [];
      
      Object.entries(itinerary).forEach(([dayKey, items]) => {
        const dayNumber = dayKey.replace('day', '');
        
        items.forEach((item) => {
          if (item.time && item.activity && item.description) {
            const itineraryItem = {
              day: `Day ${dayNumber}`,
              title: item.activity,
              description: item.description
            };
            formattedItinerary.push(JSON.stringify(itineraryItem));
          }
        });
      });
      
      return formattedItinerary;
    };

    // Helper function to format things to know
    const formatThingsToKnow = (guidelines: any[]): string[] => {
      return guidelines
        .filter(guideline => guideline.title && guideline.details)
        .map(guideline => JSON.stringify({
          title: guideline.title,
          description: guideline.details
        }));
    };

    // Helper function to format pickup points
    const formatPickupPoints = (pickupPoints: any[]): string[] => {
      return pickupPoints
        .filter(point => point.name && point.address)
        .map(point => {
          // Map pickup point names to specific keys to match target format
          let key = '';
          if (point.name.toLowerCase().includes('hotel')) {
            key = 'hotelPickup';
          } else if (point.name.toLowerCase().includes('airport')) {
            key = 'airportPickup';
          } else if (point.name.toLowerCase().includes('location') || point.name.toLowerCase().includes('specific')) {
            key = 'locationPickup';
          } else {
            key = point.name.toLowerCase().replace(/\s+/g, '');
          }

          return JSON.stringify({
            key: key,
            value: {
              cameraZoom: 15.0,
              pickupPoint: point.address,
              pickupPointLat: 0, // Default values - would need actual coordinates
              pickupPointLong: 0,
              pickupPointTitle: point.name
            }
          });
        });
    };

    // Helper function to format tour packages
    const formatTourPackages = (pricingData: any): string[] => {
      if (pricingData.pricingType === 'fixed' && pricingData.fixedPricePerPerson) {
        return [JSON.stringify({
          cost: pricingData.fixedPricePerPerson.toString(),
          fromPerson: "1",
          toPerson: "999"
        })];
      }

      if (pricingData.pricingType === 'package' && pricingData.packages) {
        return pricingData.packages.map((pkg: any) => JSON.stringify({
          cost: pkg.pricePerPerson.toString(),
          fromPerson: pkg.minTravelers.toString(),
          toPerson: pkg.maxTravelers.toString()
        }));
      }

      return [];
    };

    // Helper function to format selected food items
    const formatSelectedFoodItems = (selectedFoodItems: Record<string, any[]>): string[] => {
      const formattedItems: string[] = [];

      Object.entries(selectedFoodItems).forEach(([categoryId, items]) => {
        items.forEach((item) => {
          formattedItems.push(JSON.stringify({
            category: categoryId,
            id: item.id,
            name: item.name,
            description: item.description,
            image: item.image,
            dietaryTags: item.dietaryTags || []
          }));
        });
      });

      return formattedItems;
    };

    // Helper function to format meal categories
    const formatMealCategories = (selectedCategories: string[]): string[] => {
      return selectedCategories.map(category => JSON.stringify({
        category: category,
        selected: true
      }));
    };



    // Compile the complete tour data - matching target JSON structure exactly
    const compiledTourData = {
      // ✅ BASIC INFORMATION DATA
      name: basicData.tourTitle || '',
      description: basicData.tourOverview || '',
      tourFeatures: [...(basicData.selectedCategories || []), ...(mealData.selectedMealCategories || [])],

      // ✅ MEAL DETAILS DATA
      selectedMealCategories: formatMealCategories(mealData.selectedMealCategories || []),
      selectedFoodItems: formatSelectedFoodItems(mealData.selectedFoodItems || {}),
      menuItems: mealData.menuItems || [],
      otherTourFeature: mealData.customMenuDescription || '',

      // ✅ TOUR DETAILS DATA
      whatToExpect: detailsData.whatToExpect || '',
      inclusions: detailsData.inclusions || [],
      exclusions: detailsData.exclusions || [],
      tourDuration: `${detailsData.tourDuration?.value || 1} ${detailsData.tourDuration?.unit || 'Day'}`,
      itinerary: formatItinerary(detailsData.itinerary),
      thingsToKnow: formatThingsToKnow(detailsData.guidelines || []),
      pickupPoints: formatPickupPoints(detailsData.pickupPoints || []),
      coverPhotos: detailsData.coverPhotos || [],
      galleryPhotos: detailsData.galleryPhotos || [],

      // ✅ PRICING POLICY DATA
      tourPackages: formatTourPackages(pricingData),
      minimumAge: pricingData.minimumAge || '0',
      infantPricing: pricingData.infantPricing || 'free',
      infantDiscount: pricingData.infantDiscount || 0,
      kidsPricing: pricingData.kidsPricing || 'free',
      kidsDiscount: pricingData.kidsDiscount || 0,
      pricingType: pricingData.pricingType || 'package',
      fixedPricePerPerson: pricingData.fixedPricePerPerson || 0,
      packages: pricingData.packages || [],

      // ❌ STATIC/MISSING FIELDS (need to be implemented later)
      country: 'Turkey',
      city: 'Istanbul',
      difficultyLevel: 'Basic',
      coverImageUrl: undefined,
      galleryImageUrls: [],
      guideId: 'kifpSShKKb',
      phone: '+8801703464048',
      countryCode: '+90',
      tourTimes: ['08:00 AM', '11:00 AM'],
      galleryVideoUrls: [],
      isActive: false,
      isApproved: false,

      // ✅ ENHANCED: Add all form validation states for debugging
      formValidationStates: {
        basicInformation: {
          isValid: basicForm.formState.isValid,
          errors: basicForm.formState.errors,
          data: basicData
        },
        mealDetails: {
          isValid: mealForm.formState.isValid,
          errors: mealForm.formState.errors,
          data: mealData
        },
        tourDetails: {
          isValid: detailsForm.formState.isValid,
          errors: detailsForm.formState.errors,
          data: detailsData
        },
        pricingPolicy: {
          isValid: pricingForm.formState.isValid,
          errors: pricingForm.formState.errors,
          data: pricingData
        }
      }
    };

    return compiledTourData;
  };

  const submitTourToAPI = async (tourData: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/ProposedTour`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Parse-Application-Id': process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID!,
          'X-Parse-REST-API-Key': process.env.NEXT_PUBLIC_PARSE_REST_API_KEY!,
        },
        body: JSON.stringify(tourData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error submitting tour:', error);
      throw error;
    }
  };

  const handlePublish = async () => {
    // Show loading notification
    notifications.show({
      id: 'tour-submission',
      loading: true,
      title: 'Publishing Tour',
      message: 'Submitting your tour data to the server...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      // Compile all form data
      const tourData = compileFormData();

      console.log('=== COMPILED TOUR DATA ===');
      console.log(JSON.stringify(tourData, null, 2));

      // // Submit to API
      // console.log('🚀 Submitting tour to API...');
      // const result = await submitTourToAPI(tourData);

      // console.log('✅ Tour submitted successfully!');
      // console.log('API Response:', result);

      // // Update notification to success
      // notifications.update({
      //   id: 'tour-submission',
      //   color: 'green',
      //   title: 'Tour Published Successfully!',
      //   message: `Your tour has been created with ID: ${result.objectId}`,
      //   icon: <IconCheck size={16} />,
      //   loading: false,
      //   autoClose: 5000,
      // });

    } catch (error) {
      console.error('❌ Failed to submit tour:', error);

      // Update notification to error
      notifications.update({
        id: 'tour-submission',
        color: 'red',
        title: 'Failed to Publish Tour',
        message: 'There was an error submitting your tour. Please try again.',
        icon: <IconX size={16} />,
        loading: false,
        autoClose: 7000,
      });
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <BasicInformationStep
            onNext={() => handleStepChange('meal')}
          />
        );
      case 'meal':
        return (
          <MealDetailsStep
            onNext={() => handleStepChange('details')}
            onBack={() => setCurrentStep('basic')}
          />
        );
      case 'details':
        return (
          <TourDetailsStep
            onNext={() => handleStepChange('pricing')}
            onBack={() => setCurrentStep('meal')}
          />
        );
      case 'pricing':
        return (
          <PricingPolicy
            onNext={handlePublish}
            onBack={() => setCurrentStep('details')}
          />
        );
      default:
        return (
          <BasicInformationStep
            onNext={() => handleStepChange('meal')}
          />
        );
    }
  };

  return (
    <Stack align='center' style={{ minHeight: '100vh', backgroundColor: '#f8fafc'}} >
      {/* Sticky Header */}
      <CreateTourHeader
        currentStep={currentStep}
        onStepChange={handleStepChange}
        onPreview={handlePreview}
        onPublish={handlePublish}
      />
      {/* Scrollable Body */}
      <Container size="xl"
        p={{base: 0, sm: "lg"}}
        pt={{base: 163, sm: 120}}
        m={0}
        w={"100%"}
      >
        <Paper
          shadow="xl"
          radius="lg"
          px={{base: 10, sm: 50}}
          py={"xl"}
          mx={"auto"}
          my={{ base: 'lg', sm: 'xl' }}
          maw={1204}
          w={"100%"}
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            backgroundColor: 'white',
            position: 'relative',
            zIndex: 2
          }}
        >
          {renderCurrentStep()}
        </Paper>
      </Container>
    </Stack>
  );
}
