'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Text,
  Title,
  Button,
  Stack,
  Box,
  Group,
  Paper,
  PasswordInput
} from '@mantine/core';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

interface AccountStepProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function AccountStep({ onComplete, onBack }: AccountStepProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const inputStyles = {
    label: {
      fontFamily: 'Barlow',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '100%',
      letterSpacing: '0%',
      color: '#000000',
      marginBottom: '8px'
    },
    input: {
      fontFamily: 'Barlow',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '100%',
      letterSpacing: '0%',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '10px',
      padding: '14px 15px',
      height: 'auto',
      minHeight: '48px',
      '&::placeholder': {
        color: '#9ca3af',
        fontFamily: 'Barlow',
        fontWeight: 400,
        fontSize: '18px'
      },
      '&:focus': {
        color: '#000000'
      }
    },
    innerInput: {
      fontFamily: 'Barlow',
      fontWeight: 400,
      fontSize: '18px',
      backgroundColor: 'transparent',
      border: 'none',
      '&::placeholder': {
        color: '#9ca3af'
      }
    }
  };

  const handleComplete = () => {
    // Here you would typically validate passwords match and meet requirements
    if (password && confirmPassword && password === confirmPassword) {
      // Redirect to success page
      router.push('/signup/success');
    }
  };

  return (
    <Paper
      p={40}
      radius="md"
      style={{
        maxWidth: '962px',
        width: '100%',
        margin: '0 auto',
        border: '1px solid #e5e7eb'
      }}
    >
      <Stack gap={24}>
        <Box>
          <Title 
            order={2} 
            style={{
              fontFamily: 'Barlow',
              fontWeight: 600,
              fontSize: '24px',
              color: '#000000',
              marginBottom: '8px',
              textAlign: 'center'
            }}
          >
            Your Simsem Account
          </Title>
        </Box>

        <Stack gap={20} style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
          <PasswordInput
            label="Create Password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <IconEyeOff size={18} /> : <IconEye size={18} />
            }
            styles={{
              ...inputStyles,
              visibilityToggle: {
                color: '#6b7280'
              }
            }}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <IconEyeOff size={18} /> : <IconEye size={18} />
            }
            styles={{
              ...inputStyles,
              visibilityToggle: {
                color: '#6b7280'
              }
            }}
          />
        </Stack>

        <Box style={{ textAlign: 'center', marginTop: '20px' }}>
          <Text 
            style={{
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.4'
            }}
          >
            By clicking "Proceed", you confirm that all the information you have provided are correct.
          </Text>
        </Box>

        <Group justify="space-between" mt={32}>
          <Button
            variant="outline"
            onClick={onBack}
            style={{
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '16px',
              backgroundColor: '#9ca3af',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px'
            }}
          >
            Back
          </Button>
          <Button
            onClick={handleComplete}
            disabled={!password || !confirmPassword || password !== confirmPassword}
            style={{
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '16px',
              backgroundColor: (!password || !confirmPassword || password !== confirmPassword) 
                ? '#d1d5db' 
                : '#f97316',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px'
            }}
          >
            Proceed
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
