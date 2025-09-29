'use client';

import { Group, Box, Text, Flex } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

interface TourStepperProps {
  activeStep: number;
}

const steps = [
  { number: 1, label: 'Basic Information' },
  { number: 2, label: 'Meal Details' },
  { number: 3, label: 'Tour Details' },
  { number: 4, label: 'Review' }
];

export default function TourStepper({ activeStep }: TourStepperProps) {
  return (
    <Flex justify="space-around" style={{ marginBottom: '32px' }}>
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;

        return (
          <Box key={step.number} style={{ textAlign: 'center' }}>
            {/* Step Circle */}
            <Box
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: isCompleted ? '#1e3a8a' : isActive ? '#1e3a8a' : '#e5e7eb',
                color: isCompleted || isActive ? 'white' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Barlow',
                fontWeight: 600,
                fontSize: '16px',
                margin: '0 auto 8px auto'
              }}
            >
              {isCompleted ? <IconCheck size={20} /> : step.number}
            </Box>

            {/* Step Label */}
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: isActive ? 600 : 400,
                fontSize: '14px',
                color: isActive ? '#1e3a8a' : '#6b7280',
                textAlign: 'center'
              }}
            >
              {step.label}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
}
