'use client';

import { useState } from 'react';
import IdentificationStep from './components/IdentificationStep';
import LanguageStep from './components/LanguageStep';
import ServicesStep from './components/ServicesStep';
import PaymentStep from './components/PaymentStep';
import AccountStep from './components/AccountStep';
import { Box, Image, Container, Paper } from '@mantine/core';
import SignupStepper from './components/SignupStepper';
import { IdentificationProvider } from './contexts/IdentificationContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { PaymentProvider } from './contexts/PaymentContext';

type SignupStep = 'identification' | 'profile' | 'language' | 'services' | 'payment' | 'account';

export function SignupPage() {
  const [currentStep, setCurrentStep] = useState<SignupStep>('identification');

  const handleStepComplete = (nextStep: SignupStep) => {
    setCurrentStep(nextStep);
  };

  const handleCancel = () => {
    setCurrentStep('identification')
  };

  const getActiveStepIndex = () => {
    switch (currentStep) {
      case 'identification': return 0;
      case 'language': return 1;
      case 'services': return 2;
      case 'payment': return 3;
      case 'account': return 4;
      default: return 0;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'identification':
        return (
          <IdentificationStep
              onComplete={() => handleStepComplete('language')}
              onCancel={handleCancel}
          />
        );
      case 'language':
        return (
          <LanguageStep
            onComplete={() => handleStepComplete('services')}
            onBack={() => setCurrentStep('identification')}
          />
        );
      case 'services':
        return (
          <ServicesStep
            onComplete={() => handleStepComplete('payment')}
            onBack={() => setCurrentStep('language')}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            onComplete={() => handleStepComplete('account')}
            onBack={() => setCurrentStep('services')}
          />
        );
      case 'account':
        return (
          <AccountStep
            onComplete={() => {
              // Handle final signup completion
              console.log('Signup completed!');
              // You could redirect to a success page or dashboard here
            }}
            onBack={() => setCurrentStep('payment')}
          />
        );
      default:
        return (
          <IdentificationStep
            onComplete={() => handleStepComplete('profile')}
            onCancel={handleCancel}
          />
        );
    }
  };

  return (
    <Box style={{
      minHeight: '100vh',
      background: `linear-gradient(to bottom,
        #1e3a8a 0%,
        #1e3a8a 275px,
        #ffffff 275px,
        #ffffff 100%)`
    }}>
      <Container
        size="lg"
        py={{ base: 'xl', sm: 'xl' }}
        px={{ base: 0, sm: "lg" }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center"
        }}
      >
        <Box
          mb={{ base: 24, sm: 36 }}
          w={{ base: 280, sm: 340 }}
          h={{ base: 80, sm: 95 }}
          style={{ alignItems: "center", justifyContent: "center", display: "flex" }}
        >
          <Box
            w={{ base: 140, sm: 176 }}
            h={{ base: 58, sm: 72.7 }}
            style={{ overflow: "hidden" }}
          >
            <Image fit="fill" alt={"Simsen-Logo"} src={"/logo/simsem-tr-bg.svg"} />
          </Box>
        </Box>
        <Paper
          shadow="xl"
          radius="lg"
          p={{ base: 'sm', sm: 'xl' }}
          py={{ base: 'xl', sm: "xl" }}
          mb={{ base: 'lg', sm: 'xl' }}
          mx={{ base: 0, sm: 0 }}
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '1114px',
            border: 'none',
            position: 'relative',
            zIndex: 2
          }}
        >
          <Box
            style={{
              maxWidth: 962,
              width: "100%"
            }}
          >
            <SignupStepper activeStep={getActiveStepIndex()} />
          </Box>
          {renderCurrentStep()}
        </Paper>
      </Container>
    </Box >
  );
}


export default function SignUp () {
  return (
    <LanguageProvider>
      <IdentificationProvider>
        
          <PaymentProvider>
            <SignupPage />
          </PaymentProvider>
      
      </IdentificationProvider>
    </LanguageProvider>
  );
}