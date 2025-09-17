'use client';

import { useState } from 'react';
import {
  Text,
  Title,
  Button,
  Stack,
  Box,
  Group,
  Paper,
  TextInput
} from '@mantine/core';

interface PaymentStepProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function PaymentStep({ onComplete, onBack }: PaymentStepProps) {
  const [iban, setIban] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [bankAddress, setBankAddress] = useState('');

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
              marginBottom: '8px'
            }}
          >
            Payment Information
          </Title>
        </Box>

        <Stack gap={16}>
          <TextInput
            label="IBAN"
            placeholder="Fill out your bank account information."
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            styles={inputStyles}
          />

          <TextInput
            label="Your Full Name"
            placeholder="Your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            styles={inputStyles}
          />

          <TextInput
            label="Your Address"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            styles={inputStyles}
          />

          <TextInput
            label="Bank Name"
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            styles={inputStyles}
          />

          <TextInput
            label="IBAN"
            placeholder="IBAN"
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
            styles={inputStyles}
          />

          <TextInput
            label="SWIFT/BIC"
            placeholder="SWIFT/BIC"
            value={swiftCode}
            onChange={(e) => setSwiftCode(e.target.value)}
            styles={inputStyles}
          />

          <TextInput
            label="Bank Address"
            placeholder="Bank Address"
            value={bankAddress}
            onChange={(e) => setBankAddress(e.target.value)}
            styles={inputStyles}
          />
        </Stack>

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
            onClick={onComplete}
            style={{
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '16px',
              backgroundColor: '#f97316',
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
