'use client';

import { useState } from 'react';
import { Box, Container, Paper, Stack } from '@mantine/core';
import CreateTourHeader from './components/CreateTourHeader';
import BasicInformationStep from './components/BasicInformationStep';
import TourDetailsStep from './components/TourDetailsStep';
import PricingPolicy from './components/PricingPolicy';
import { BasicInformationProvider } from './contexts/BasicInformationContext';

type TourStep = 'basic' | 'details' | 'pricing';

export default function CreateTourPage() {
  const [currentStep, setCurrentStep] = useState<TourStep>('basic');

  const handleStepChange = (nextStep: TourStep) => {
    setCurrentStep(nextStep);
  };

  const handlePreview = () => {
    // Handle preview functionality
    console.log('Preview clicked');
  };

  const handlePublish = () => {
    // Handle final tour creation
    console.log('Tour created!');
    // You could redirect to tour list or success page here
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
    <BasicInformationProvider>
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
    </BasicInformationProvider>
  );
}