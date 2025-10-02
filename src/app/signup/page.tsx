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

type SignupStep = 'identification' | 'profile' | 'language' | 'services' | 'payment' | 'account';

// Inner component that has access to contexts
function SignupPageInner() {
  const router = useRouter();
  const identification = useIdentification();
  const language = useLanguage();
  const payment = usePayment();

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
      isLocalSeller: false,
      isFamilyHost: false,
      isTourGuide: identificationData?.isCertifiedGuide || true,
      isSocialAuth: false
    };

    console.log('\n=== MAPPED API DATA ===');
    console.log(JSON.stringify(apiData, null, 2));

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

    console.log('\n=== PAYMENT API DATA ===');
    console.log(JSON.stringify(paymentApiData, null, 2));

    try {
      console.log('\n=== CREATING PAYMENT FIRST ===');

      // Show loading notification
      notifications.show({
        id: 'creating-account',
        title: 'Creating Payment Information...',
        message: 'Please wait while we process your payment information.',
        color: 'blue',
        loading: true,
        autoClose: false,
      });

      // Step 1: Create payment information
      const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/ServiceProviderPayment`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'X-Parse-Application-Id': process.env.NEXT_PUBLIC_APPLICATION_ID!,
          'X-Parse-REST-API-Key': process.env.NEXT_PUBLIC_REST_API_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentApiData)
      });

      if (!paymentResponse.ok) {
        const paymentError = await paymentResponse.text();
        console.error('❌ Payment API Error:', paymentError);
        throw new Error(`Payment API Error: ${paymentResponse.status} - ${paymentError}`);
      }

      const paymentResult = await paymentResponse.json();
      console.log('✅ Payment API Success:', paymentResult);

      // Update loading notification
      notifications.update({
        id: 'creating-account',
        title: 'Uploading Files...',
        message: 'Payment information saved. Uploading your documents...',
        color: 'blue',
        loading: true,
        autoClose: false,
      });

      console.log('\n=== UPLOADING FILES ===');

      // Helper function to upload a file
      const uploadFile = async (file: File, filePath: string): Promise<string> => {
        const uploadUrl = `${process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL}${filePath}`;

        const response = await fetch(uploadUrl, {
          method: 'PUT',
          headers: {
            'AccessKey': process.env.NEXT_PUBLIC_ACCESS_KEY!,
            'Content-Type': 'application/octet-stream',
          },
          body: file
        });

        if (!response.ok) {
          throw new Error(`Failed to upload file: ${response.status}`);
        }

        return `${process.env.NEXT_PUBLIC_BUNNY_CDN_URL}${filePath}`;
      };

      // Generate unique user ID for file paths (you can replace with actual user ID)
      const userId = `user_${Date.now()}`;
      const uploadedFiles: { [key: string]: string } = {};

      // Upload profile photo
      if (identificationData?.profilePhoto?.file) {
        try {
          const fileExtension = identificationData.profilePhoto.name.split('.').pop() || 'jpeg';
          const filePath = `/profiles/${userId}/avatar/profile.${fileExtension}`;
          const uploadedUrl = await uploadFile(identificationData.profilePhoto.file, filePath);
          uploadedFiles.imageUrl = uploadedUrl;
          console.log('✅ Profile photo uploaded:', uploadedUrl);
        } catch (error) {
          console.error('❌ Profile photo upload failed:', error);
        }
      }

      // Upload ID card front side
      if (identificationData?.idCardFrontSide?.file) {
        try {
          const fileExtension = identificationData.idCardFrontSide.name.split('.').pop() || 'jpeg';
          const filePath = `/profiles/${userId}/documents/id_front.${fileExtension}`;
          const uploadedUrl = await uploadFile(identificationData.idCardFrontSide.file, filePath);
          uploadedFiles.idFrontFileUrl = uploadedUrl;
          console.log('✅ ID front uploaded:', uploadedUrl);
        } catch (error) {
          console.error('❌ ID front upload failed:', error);
        }
      }

      // Upload ID card back side
      if (identificationData?.idCardBackSide?.file) {
        try {
          const fileExtension = identificationData.idCardBackSide.name.split('.').pop() || 'jpeg';
          const filePath = `/profiles/${userId}/documents/id_back.${fileExtension}`;
          const uploadedUrl = await uploadFile(identificationData.idCardBackSide.file, filePath);
          uploadedFiles.idBackFileUrl = uploadedUrl;
          console.log('✅ ID back uploaded:', uploadedUrl);
        } catch (error) {
          console.error('❌ ID back upload failed:', error);
        }
      }

      // Upload tour guide certificate (if provided)
      if (identificationData?.tourGuideCertificate?.file) {
        try {
          const fileExtension = identificationData.tourGuideCertificate.name.split('.').pop() || 'pdf';
          const filePath = `/profiles/${userId}/certificates/guide_cert.${fileExtension}`;
          const uploadedUrl = await uploadFile(identificationData.tourGuideCertificate.file, filePath);
          uploadedFiles.certificateFileUrl = uploadedUrl;
          console.log('✅ Certificate uploaded:', uploadedUrl);
        } catch (error) {
          console.error('❌ Certificate upload failed:', error);
        }
      }

      console.log('\n=== UPLOADED FILES ===');
      console.log(JSON.stringify(uploadedFiles, null, 2));

      // Update loading notification
      notifications.update({
        id: 'creating-account',
        title: 'Creating Account...',
        message: 'Files uploaded. Creating your account...',
        color: 'blue',
        loading: true,
        autoClose: false,
      });

      console.log('\n=== CREATING SERVICE PROVIDER ACCOUNT ===');

      // Add payment information and uploaded files to the API data
      const serviceProviderData = {
        ...apiData,
        ...uploadedFiles, // Add all uploaded file URLs
        payment: {
          id: paymentResult.objectId,
          _objCount: 2,
          className: "ServiceProviderPayment"
        }
      };

      console.log('\n=== SERVICE PROVIDER DATA WITH PAYMENT ===');
      console.log(JSON.stringify(serviceProviderData, null, 2));

      // Step 2: Create service provider account
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/ServiceProvider`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'X-Parse-Application-Id': process.env.NEXT_PUBLIC_APPLICATION_ID!,
          'X-Parse-REST-API-Key': process.env.NEXT_PUBLIC_REST_API_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceProviderData)
      });

      if (!response.ok) {
        const accountError = await response.text();
        console.error('❌ Account API Error:', accountError);
        throw new Error(`Account API Error: ${response.status} - ${accountError}`);
      }

      const result = await response.json();
      console.log('✅ Account API Success:', result);

      // Hide loading notification and show success
      notifications.hide('creating-account');
      notifications.show({
        title: 'Account Created Successfully!',
        message: 'Welcome to Simsem! Your account and payment information have been saved.',
        color: 'green',
        autoClose: 3000,
      });

      router.push('/signup/success');
    } catch (error) {
      console.error('❌ API Error:', error);

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
        <PaymentProvider>
          <SignupPageInner />
        </PaymentProvider>
      </IdentificationProvider>
    </LanguageProvider>
  );
}