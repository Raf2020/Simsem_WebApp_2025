'use client';

import { Stepper } from '@mantine/core';

interface SignupStepperProps {
  activeStep: number;
}

export default function SignupStepper({ activeStep }: SignupStepperProps) {
  return (
    <Stepper
      active={activeStep}
      size="sm"
      styles={{
        stepIcon: {
          backgroundColor: 'white',
          color: '#1e3a8a',
          border: '2px solid white',
          borderRadius: '50%',
          fontWeight: 600,
        },
        stepLabel: {
          color: 'white',
          fontSize: '12px',
          fontWeight: 500,
          marginTop: '8px',
        },
        separator: {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          height: '2px',
        },
      }}
      style={{
        marginBottom: '32px',
      }}
    >
      <Stepper.Step label="About you" />
      <Stepper.Step label="Language" />
      <Stepper.Step label="Services" />
      <Stepper.Step label="Payment" />
      <Stepper.Step label="Account" />
    </Stepper>
  );
}
