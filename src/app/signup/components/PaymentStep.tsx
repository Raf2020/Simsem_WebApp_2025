'use client';

import { useState } from 'react';
import {
  Text,
  Title,
  Button,
  Stack,
  Box,
  Group,
  TextInput,
  Paper,
  Flex
} from '@mantine/core';

interface PaymentStepProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function PaymentStep({ onComplete, onBack }: PaymentStepProps) {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [bankName, setBankName] = useState('');
  const [iban, setIban] = useState('');
  const [swiftBic, setSwiftBic] = useState('');
  const [bankAddress, setBankAddress] = useState('');

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
          <Stack
            gap={24}
            w={{ base: "100%", sm: 526 }}
          >
            <Box ta={{ base: "center", sm: "left" }}>
              <Title
                order={2}
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 600,
                  fontSize: '24px',
                  color: '#0D2E61',
                  marginBottom: '24px'
                }}
              >
                Payment Information
              </Title>
            </Box>

            <Box>
              <Box
                style={{
                  backgroundColor: '#f3f4f6',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  marginBottom: '24px'
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#374151'
                  }}
                >
                  IBAN
                </Text>
              </Box>

              <Text
                ta="center"
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#6b7280',
                  marginBottom: '24px'
                }}
              >
                Fill out your bank account information.
              </Text>

              <Stack gap={16}>
                <TextInput
                  placeholder="Your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  styles={{
                    input: {
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '16px 20px',
                      height: '56px',
                      fontFamily: 'Barlow',
                      fontSize: '16px',
                      color: '#9ca3af',
                      '&::placeholder': {
                        color: '#9ca3af'
                      },
                      '&:focus': {
                        backgroundColor: '#f3f4f6',
                        borderColor: 'transparent'
                      }
                    }
                  }}
                />

                <TextInput
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  styles={{
                    input: {
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '16px 20px',
                      height: '56px',
                      fontFamily: 'Barlow',
                      fontSize: '16px',
                      color: '#9ca3af',
                      '&::placeholder': {
                        color: '#9ca3af'
                      },
                      '&:focus': {
                        backgroundColor: '#f3f4f6',
                        borderColor: 'transparent'
                      }
                    }
                  }}
                />

                <TextInput
                  placeholder="Bank Name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  styles={{
                    input: {
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '16px 20px',
                      height: '56px',
                      fontFamily: 'Barlow',
                      fontSize: '16px',
                      color: '#9ca3af',
                      '&::placeholder': {
                        color: '#9ca3af'
                      },
                      '&:focus': {
                        backgroundColor: '#f3f4f6',
                        borderColor: 'transparent'
                      }
                    }
                  }}
                />

                <TextInput
                  placeholder="IBAN"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  styles={{
                    input: {
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '16px 20px',
                      height: '56px',
                      fontFamily: 'Barlow',
                      fontSize: '16px',
                      color: '#9ca3af',
                      '&::placeholder': {
                        color: '#9ca3af'
                      },
                      '&:focus': {
                        backgroundColor: '#f3f4f6',
                        borderColor: 'transparent'
                      }
                    }
                  }}
                />

                <TextInput
                  placeholder="SWIFT/BIC"
                  value={swiftBic}
                  onChange={(e) => setSwiftBic(e.target.value)}
                  styles={{
                    input: {
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '16px 20px',
                      height: '56px',
                      fontFamily: 'Barlow',
                      fontSize: '16px',
                      color: '#9ca3af',
                      '&::placeholder': {
                        color: '#9ca3af'
                      },
                      '&:focus': {
                        backgroundColor: '#f3f4f6',
                        borderColor: 'transparent'
                      }
                    }
                  }}
                />

                <TextInput
                  placeholder="Bank Address"
                  value={bankAddress}
                  onChange={(e) => setBankAddress(e.target.value)}
                  styles={{
                    input: {
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '16px 20px',
                      height: '56px',
                      fontFamily: 'Barlow',
                      fontSize: '16px',
                      color: '#9ca3af',
                      '&::placeholder': {
                        color: '#9ca3af'
                      },
                      '&:focus': {
                        backgroundColor: '#f3f4f6',
                        borderColor: 'transparent'
                      }
                    }
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Paper>

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
          onClick={onComplete}
          w={{ base: '100%', sm: 'auto' }}
          style={{
            backgroundColor: '#f59e0b',
            color: 'white',
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