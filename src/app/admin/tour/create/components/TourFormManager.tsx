'use client';

import { useState } from 'react';
import { Box, Container, Paper, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import CreateTourHeader from './CreateTourHeader';
import BasicInformationStep from './BasicInformationStep';
import TourDetailsStep from './TourDetailsStep';
import PricingPolicy from './PricingPolicy';
import { useBasicInformation } from '../contexts/BasicInformationContext';
import { useTourDetails } from '../contexts/TourDetailsContext';
import { usePricingPolicy } from '../contexts/PricingPolicyContext';

type TourStep = 'basic' | 'details' | 'pricing';

export default function TourFormManager() {
  const [currentStep, setCurrentStep] = useState<TourStep>('basic');
  
  // Access all form contexts
  const { form: basicForm } = useBasicInformation();
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



    // Compile the complete tour data - matching target JSON structure exactly
    const compiledTourData = {
      // Match exact field order and structure from target JSON
      thingsToKnow: formatThingsToKnow(detailsData.guidelines || []),
      country: 'Turkey', // ❌ MISSING: Need location form
      pickupPoints: formatPickupPoints(detailsData.pickupPoints || []),
      city: 'ue', // ❌ MISSING: Need location form
      difficultyLevel: 'Basic', // ❌ MISSING: Need difficulty selector
      coverImageUrl: undefined, // ❌ IGNORE: Set to undefined for now
      galleryImageUrls: [], // ❌ IGNORE: Set to empty array for now
      guideId: 'kifpSShKKb', // ❌ MISSING: Need from authentication/user context
      description: basicData.tourOverview || '',
      exclusions: detailsData.exclusions || [],
      itinerary: formatItinerary(detailsData.itinerary),
      tourPackages: formatTourPackages(pricingData),
      tourFeatures: basicData.selectedCategories || [],
      whatToExpect: detailsData.whatToExpect || '',
      otherTourFeature: '', // ✅ MATCHED: Empty string
      phone: '+8801703464048', // ❌ MISSING: Need contact form
      countryCode: '+90', // ❌ MISSING: Need contact form
      name: basicData.tourTitle || '',
      tourTimes: ['08:00 AM', '11:00 AM'], // ❌ MISSING: Need time selector
      tourDuration: `${detailsData.tourDuration.value} ${detailsData.tourDuration.unit}`,
      inclusions: detailsData.inclusions || [],
      galleryVideoUrls: [], // ❌ MISSING: Need video upload functionality
      isActive: false, // ✅ MATCHED: System field
      isApproved: false, // ✅ MATCHED: System field
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

      // Submit to API
      console.log('🚀 Submitting tour to API...');
      const result = await submitTourToAPI(tourData);

      console.log('✅ Tour submitted successfully!');
      console.log('API Response:', result);

      // Update notification to success
      notifications.update({
        id: 'tour-submission',
        color: 'green',
        title: 'Tour Published Successfully!',
        message: `Your tour has been created with ID: ${result.objectId}`,
        icon: <IconCheck size={16} />,
        loading: false,
        autoClose: 5000,
      });

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
            onNext={() => handleStepChange('details')}
          />
        );
      case 'details':
        return (
          <TourDetailsStep
            onNext={() => handleStepChange('pricing')}
            onBack={() => setCurrentStep('basic')}
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
            onNext={() => handleStepChange('details')}
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
