'use client';

import { useState } from 'react';
import IdentificationStep from './components/IdentificationStep';
import LanguageStep from './components/LanguageStep';
import ServicesStep from './components/ServicesStep';
import PaymentStep from './components/PaymentStep';
import AccountStep from './components/AccountStep';
import { Box, Image, Container, Paper } from '@mantine/core';
import SignupStepper from './components/SignupStepper';

type SignupStep = 'identification' | 'profile' | 'language' | 'services' | 'payment' | 'account';

export default function SignupPage() {
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
      case 'profile':
        return (
          <div>Profile Step - Coming Soon</div>
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
      <Container size="lg" style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem', flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
        <Box mb={36} w={340} h={95} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
          <Box w={176} h={72.7} style={{ overflow: "hidden" }}>
            <Image fit="fill" alt={"Simsen-Logo"} src={"/logo/simsem-tr-bg.svg"} />
          </Box>
        </Box>
        <Paper
          shadow="xl"
          radius="lg"
          p="xl"
          mb="xl"
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
          <Box style={{
            width: "100%"
          }}>
            <SignupStepper activeStep={getActiveStepIndex()} />
          </Box>
          {renderCurrentStep()}
        </Paper>
      </Container>
    </Box>
  );
}