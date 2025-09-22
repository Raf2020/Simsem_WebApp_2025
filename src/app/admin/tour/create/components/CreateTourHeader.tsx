'use client';

import { Box, Container, Text, Button, Flex, Progress } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';

interface CreateTourHeaderProps {
  currentStep: 'basic' | 'details' | 'review';
  onStepChange: (step: 'basic' | 'details' | 'review') => void;
  onPreview: () => void;
  onPublish: () => void;
}

export default function CreateTourHeader({
  currentStep,
  onStepChange,
  onPreview,
  onPublish
}: CreateTourHeaderProps) {
  const getActiveStepIndex = () => {
    switch (currentStep) {
      case 'basic': return 0;
      case 'details': return 1;
      case 'review': return 2;
      default: return 0;
    }
  };

  const getProgressValue = () => {
    return ((getActiveStepIndex() + 1) / 3) * 100;
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
                Create new getaway experience
              </Text>
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#6b7280'
                }}
              >
                Step {getActiveStepIndex() + 1} of 3
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
                    if (currentStep === 'details') onStepChange('basic');
                    if (currentStep === 'review') onStepChange('details');
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
                onClick={() => {
                  if (currentStep === 'basic') onStepChange('details');
                  else if (currentStep === 'details') onStepChange('review');
                  else onPublish();
                }}
                style={{
                  backgroundColor: currentStep === 'review' ? '#16a34a' : '#1e3a8a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'Barlow'
                }}
              >
                {currentStep === 'review' ? 'Publish Tour' : 'Next'}
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
