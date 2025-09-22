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
  PasswordInput,
  Flex
} from '@mantine/core';

interface AccountStepProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function AccountStep({ onComplete, onBack }: AccountStepProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isFormValid = password.length >= 6 && password === confirmPassword;

  const handleComplete = () => {
    if (isFormValid) {
      router.push('/signup/success');
    }
  };

  return (
    <Stack gap="lg" style={{
      maxWidth: 962,
      width: "100%"
    }}>
      <Paper
        p={{ base: "sm", sm: "xl" }}
        py={"xl"}
        radius="lg"
        withBorder
        style={{
          width: '100%',
          margin: '0 auto'
        }}
      >
        <Stack align='center'>
          <Stack gap={24} w={{ base: "100%", sm: 526 }}>
            <Box ta={{ base: "center", sm: "left" }}>
              <Title
                order={2}
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 600,
                  fontSize: '20px',
                  color: '#0D2E61',
                  marginBottom: '24px'
                }}
              >
                Your Simsem Account
              </Title>
            </Box>

            <Stack gap={16}>
              <PasswordInput
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                styles={{
                  input: {
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '16px 20px',
                    height: '56px',
                    fontFamily: 'Barlow',
                    fontSize: '16px',
                    color: '#374151',
                    '&::placeholder': {
                      color: '#9ca3af'
                    },
                    '&:focus': {
                      backgroundColor: '#f3f4f6',
                      borderColor: 'transparent'
                    }
                  },
                  visibilityToggle: {
                    color: '#6b7280'
                  }
                }}
                rightSection={
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontSize: '14px',
                      color: '#6b7280',
                      marginRight: '12px'
                    }}
                  >
                    Show
                  </Text>
                }
              />

              <PasswordInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                styles={{
                  input: {
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '16px 20px',
                    height: '56px',
                    fontFamily: 'Barlow',
                    fontSize: '16px',
                    color: '#374151',
                    '&::placeholder': {
                      color: '#9ca3af'
                    },
                    '&:focus': {
                      backgroundColor: '#f3f4f6',
                      borderColor: 'transparent'
                    }
                  },
                  visibilityToggle: {
                    color: '#6b7280'
                  }
                }}
                rightSection={
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontSize: '14px',
                      color: '#6b7280',
                      marginRight: '12px'
                    }}
                  >
                    Show
                  </Text>
                }
              />
            </Stack>


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
      <Flex
        justify="space-between"
        gap={12}
        direction={{ base: "column", sm: "row" }}
      >
        <Button
          variant="filled"
          size="md"
          onClick={onBack}
          w={{ base: '100%', sm: 'auto' }}
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
          w={{ base: '100%', sm: 'auto' }}
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
      </Flex>
    </Stack>
  );
}
