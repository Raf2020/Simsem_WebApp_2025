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
    <Stack gap="lg" style={{
      maxWidth: 962,
      width: "100%"
    }}>
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


        </Stack>
      </Paper>
      <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Text
          style={{
            fontFamily: 'Barlow',
            fontWeight: 400,
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.4'
          }}
        >
          By clicking &quot;Proceed&quot;, you confirm that all the information you have provided are correct.
        </Text>
      </Box>
      {/* Buttons */}
      <Group justify="space-between">
        <Button
          variant="filled"
          size="md"
          onClick={onBack}
          style={{
            backgroundColor: '#d1d5db',
            color: '#6b7280',
            border: 'none',
            borderRadius: '6px',
            height: '44px',
            fontSize: '14px',
            fontWeight: 500,
            minWidth: '120px'
          }}
        >
          Back
        </Button>

        <Button
          size="md"
          onClick={handleComplete}
          disabled={!password || !confirmPassword || password !== confirmPassword}
          style={{
            backgroundColor: (!password || !confirmPassword || password !== confirmPassword)
              ? '#d1d5db'
              : '#f59e0b',
            color: (!password || !confirmPassword || password !== confirmPassword)
              ? '#6b7280'
              : 'white',
            border: 'none',
            borderRadius: '6px',
            height: '44px',
            fontSize: '14px',
            fontWeight: 500,
            minWidth: '120px'
          }}
        >
          Proceed
        </Button>
      </Group>
    </Stack>
  );
}
