'use client';

import { Box, Container, Text, Button, Flex, Progress } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import { useBasicInformation } from '../contexts/BasicInformationContext';
import { useMealDetails } from '../contexts/MealDetailsContext';
import { useTourDetails } from '../contexts/TourDetailsContext';

interface CreateTourHeaderProps {
  currentStep: 'basic' | 'meal' | 'details' | 'pricing';
  onStepChange: (step: 'basic' | 'meal' | 'details' | 'pricing') => void;
  onPreview: () => void;
  onPublish: () => void;
}

export default function CreateTourHeader({
  currentStep,
  onStepChange,
  onPreview,
  onPublish
}: CreateTourHeaderProps) {
  const { form: basicForm } = useBasicInformation();
  const { form: mealForm } = useMealDetails();
  const { form: detailsForm } = useTourDetails();

  const getActiveStepIndex = () => {
    switch (currentStep) {
      case 'basic': return 0;
      case 'meal': return 1;
      case 'details': return 2;
      case 'pricing': return 3;
      default: return 0;
    }
  };

  const getProgressValue = () => {
    return ((getActiveStepIndex() + 1) / 4) * 100;
  };

  const handleNextClick = async () => {
    if (currentStep === 'basic') {
      // Trigger validation for basic information step
      const isValid = await basicForm.trigger();

      if (isValid) {
        onStepChange('meal');
      } else {
        // Optional: You could show a toast notification here
        console.log('Please fix basic information validation errors before proceeding');
      }
    } else if (currentStep === 'meal') {
      // Trigger validation for meal details step
      const isValid = await mealForm.trigger();

      if (isValid) {
        onStepChange('details');
      } else {
        // Optional: You could show a toast notification here
        console.log('Please fix meal details validation errors before proceeding');
      }
    } else if (currentStep === 'details') {
      // Trigger validation for tour details step
      const isValid = await detailsForm.trigger();

      if (isValid) {
        onStepChange('pricing');
      } else {
        // Optional: You could show a toast notification here
        console.log('Please fix tour details validation errors before proceeding');
      }
    } else {
      onPublish();
    }
  };

  return (
    <Box
      w={"100%"}
      h={{base: 163, sm: "auto"}}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}
    >
      <Container size="xl" px="md">
        <Box py="md">
          <Flex justify="space-between" align="center" mb="lg">
            <Box>
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 500,
                  fontSize: '18px',
                  color: '#0D2E61'
                }}
              >
                Create new dining experience
              </Text>
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#6b7280'
                }}
              >
                Step {getActiveStepIndex() + 1} of 4
              </Text>
            </Box>

            <Flex gap="sm" align="center">
              <Button
                variant="outline"
                leftSection={<IconEye size={16} />}
                onClick={onPreview}
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: '#6b7280',
                  borderColor: '#d1d5db',
                  backgroundColor: 'transparent'
                }}
              >
                Preview
              </Button>

              {currentStep !== 'basic' && (
                <Button
                  variant="filled"
                  onClick={() => {
                    if (currentStep === 'meal') onStepChange('basic');
                    if (currentStep === 'details') onStepChange('meal');
                    if (currentStep === 'pricing') onStepChange('details');
                  }}
                  style={{
                    backgroundColor: '#d1d5db',
                    color: '#6b7280',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Barlow'
                  }}
                >
                  Back
                </Button>
              )}

              <Button
                onClick={handleNextClick}
                style={{
                  backgroundColor: currentStep === 'pricing' ? '#16a34a' : '#1e3a8a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'Barlow'
                }}
              >
                {currentStep === 'pricing' ? 'Publish Tour' : 'Next'}
              </Button>
            </Flex>
          </Flex>

          {/* Progress Bar */}
          <Progress
            value={getProgressValue()}
            size="sm"
            color="#1e3a8a"
            style={{
              backgroundColor: '#e5e7eb'
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
