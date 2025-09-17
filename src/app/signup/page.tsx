'use client';

import { useState } from 'react';
import IdentificationStep from './components/IdentificationStep';
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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'identification':
        return (
          <IdentificationStep
            onComplete={() => handleStepComplete('profile')}
            onCancel={handleCancel}
          />
        );
      case 'profile':
        return (
          <div>Profile Step - Coming Soon</div>
        );
      case 'language':
        return (
          <div>Language Step - Coming Soon</div>
        );
      case 'services':
        return (
          <div>Services Step - Coming Soon</div>
        );
      case 'payment':
        return (
          <div>Payment Step - Coming Soon</div>
        );
      case 'account':
        return (
          <div>Account Step - Coming Soon</div>
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
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '600px',
            border: 'none',
            position: 'relative',
            zIndex: 2
          }}
        >
          <SignupStepper activeStep={0} />
          {renderCurrentStep()}
        </Paper>
      </Container>
    </Box>
  );
}