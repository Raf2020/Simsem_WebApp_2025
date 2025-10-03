'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import IdentificationStep from './components/IdentificationStep';
import LanguageStep from './components/LanguageStep';
import ServicesStep from './components/ServicesStep';
import PaymentStep from './components/PaymentStep';
import AccountStep from './components/AccountStep';
import { Box, Image, Container, Paper } from '@mantine/core';
import SignupStepper from './components/SignupStepper';
import { IdentificationProvider, useIdentification } from './contexts/IdentificationContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { PaymentProvider, usePayment } from './contexts/PaymentContext';
import { ServicesProvider, useServices } from './contexts/ServicesContext';

type SignupStep = 'identification' | 'profile' | 'language' | 'services' | 'payment' | 'account';

// Inner component that has access to contexts
function SignupPageInner() {
  const router = useRouter();
  const identification = useIdentification();
  const language = useLanguage();
  const payment = usePayment();
  const services = useServices();

  const [currentStep, setCurrentStep] = useState<SignupStep>('identification');

  const handleStepComplete = (nextStep: SignupStep) => {
    setCurrentStep(nextStep);
  };

  const handleCancel = () => {
    setCurrentStep('identification')
  };

  const handleAccountComplete = async () => {
    // Get form data from all contexts
    const identificationData = identification.form.getValues();
    const languageData = language.form.getValues();
    const paymentData = payment.form.getValues();

    console.log('=== FORM DATA COMPARISON ===');
    console.log('Target API Structure:');
    console.log({
      "name": "Local Host Name",
      "email": "host@email.com",
      "phone": "+11111111",
      "country": "Egypt",
      "city": "giza",
      "about": "First of all it's pleasure to me to introduce myself my name's Gamil",
      "firstLanguage": "English",
      "firstLanguageLevel": "Advanced",
      "secondLanguage": "Arabic",
      "secondLanguageLevel": "Basic",
      "thirdLanguage": "Bangla",
      "thirdLanguageLevel": "Intermediate",
      "isLocalSeller": false,
      "isFamilyHost": false,
      "isTourGuide": true,
      "isSocialAuth": false
    });

    console.log('\n=== CURRENT FORM DATA ===');
    console.log('Identification:', identificationData);
    console.log('Languages:', languageData);
    console.log('Payment:', paymentData);

    // Map form data to API format
    const languages = languageData?.languages || [];
    const apiData = {
      name: `${identificationData?.firstName || ''} ${identificationData?.lastName || ''}`.trim(),
      email: identificationData?.email || '',
      phone: identificationData?.phone || '',
      country: identificationData?.country || '',
      city: identificationData?.city || '',
      about: identificationData?.introduction || '',
      firstLanguage: languages[0]?.name || '',
      firstLanguageLevel: mapProficiencyLevel(languages[0]?.proficiency),
      secondLanguage: languages[1]?.name || '',
      secondLanguageLevel: mapProficiencyLevel(languages[1]?.proficiency),
      thirdLanguage: languages[2]?.name || '',
      thirdLanguageLevel: mapProficiencyLevel(languages[2]?.proficiency),
      isLocalSeller: services.isLocalSeller,
      isFamilyHost: services.isFamilyHost,
      isTourGuide: services.isTourGuide,
      isSocialAuth: false
    };

    // Prepare payment data for API
    const paymentApiData = {
      type: 'IBAN', // Fixed value as required by API
      phone: identificationData?.phone || '', // Get phone from identification data
      fullName: paymentData?.fullName || `${identificationData?.firstName || ''} ${identificationData?.lastName || ''}`.trim(),
      address: paymentData?.address || '',
      bankName: paymentData?.bankName || '',
      iban: paymentData?.iban || '',
      swiftOrBic: paymentData?.swiftBic || '',
      bankAddress: paymentData?.bankAddress || ''
    };

    try {
      // Show loading notification
      notifications.show({
        id: 'creating-account',
        title: 'Creating Account...',
        message: 'Please wait while we process your information...',
        color: 'blue',
        loading: true,
        autoClose: false,
      });

      // Prepare files for upload
      const files: { [key: string]: any } = {};

      if (identificationData?.profilePhoto?.file) {
        files.profilePhoto = {
          name: identificationData.profilePhoto.name,
          type: identificationData.profilePhoto.type,
          size: identificationData.profilePhoto.size,
          buffer: Array.from(new Uint8Array(await identificationData.profilePhoto.file.arrayBuffer()))
        };
      }

      if (identificationData?.idCardFrontSide?.file) {
        files.idCardFrontSide = {
          name: identificationData.idCardFrontSide.name,
          type: identificationData.idCardFrontSide.type,
          size: identificationData.idCardFrontSide.size,
          buffer: Array.from(new Uint8Array(await identificationData.idCardFrontSide.file.arrayBuffer()))
        };
      }

      if (identificationData?.idCardBackSide?.file) {
        files.idCardBackSide = {
          name: identificationData.idCardBackSide.name,
          type: identificationData.idCardBackSide.type,
          size: identificationData.idCardBackSide.size,
          buffer: Array.from(new Uint8Array(await identificationData.idCardBackSide.file.arrayBuffer()))
        };
      }

      if (identificationData?.tourGuideCertificate?.file) {
        files.tourGuideCertificate = {
          name: identificationData.tourGuideCertificate.name,
          type: identificationData.tourGuideCertificate.type,
          size: identificationData.tourGuideCertificate.size,
          buffer: Array.from(new Uint8Array(await identificationData.tourGuideCertificate.file.arrayBuffer()))
        };
      }

      // Call the secure backend API
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...apiData,
          paymentData: paymentApiData,
          files
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Backend API Error:', errorData);
        throw new Error(`Backend API Error: ${response.status} - ${errorData.error}`);
      }

      // Show success notification
      notifications.update({
        id: 'creating-account',
        title: 'Account Created Successfully!',
        message: 'Welcome to Simsem! Your account has been created.',
        color: 'green',
        loading: false,
        autoClose: 3000,
      });

      router.push('/signup/success');
    } catch (error) {
      console.error('❌ Backend API Error:', error);

      // Hide loading notification and show error
      notifications.hide('creating-account');
      notifications.show({
        title: 'Account Creation Failed',
        message: error instanceof Error ? error.message : 'Failed to create account. Please try again.',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  // Helper function to map proficiency levels
  const mapProficiencyLevel = (proficiency: string): string => {
    const levelMap: { [key: string]: string } = {
      'NATIVE': 'Native',
      'FLUENT': 'Advanced',
      'CONVERSATIONAL': 'Intermediate',
      'BASIC': 'Basic'
    };

    return levelMap[proficiency] || proficiency || '';
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
            onComplete={handleAccountComplete}
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
        <ServicesProvider>
          <PaymentProvider>
            <SignupPageInner />
          </PaymentProvider>
        </ServicesProvider>
      </IdentificationProvider>
    </LanguageProvider>
  );
}