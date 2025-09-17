'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Image,
  Container,
  Paper,
  Text,
  Title,
  Checkbox,
  Button,
  Stack,
  Group,
  Anchor
} from '@mantine/core';

export default function TermsPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleAccept = () => {
    if (agreed) {
      // Redirect to signup page after accepting terms
      router.push('/signup');
    }
  };

  const handleCancel = () => {
    // Redirect to home or previous page
    router.push('/');
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
      <Container size="lg" style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem', flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
        <Box mb={36} w={340} h={95} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
          <Box w={176} h={72.7} style={{ overflow: "hidden" }}>
            <Image fit="fill" alt={"Simsen-Logo"} src={"/logo/simsem-tr-bg.svg"} />
          </Box>
        </Box>
        <Paper
          shadow="xl"
          radius="lg"
          p="xl"
          mb="xl"
          style={{
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '600px',
            border: 'none',
            position: 'relative',
            zIndex: 2
          }}
        >
          <Stack gap="md">
            {/* Header */}
            <Title
              order={2}
              style={{
                textAlign: 'center',
                color: '#1f2937',
                fontWeight: 600,
                fontSize: '20px',
                marginBottom: '16px'
              }}
            >
              Terms & Conditions
            </Title>

            {/* Terms Content Box - Scrollable */}
            <div
              style={{
                backgroundColor: '#e5e7eb',
                borderRadius: '6px',
                padding: '16px',
                marginBottom: '16px',
                height: '200px',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: '#9ca3af #d1d5db'
              }}
              className="custom-scrollbar"
            >
              <Text
                size="sm"
                style={{
                  color: '#f59e0b',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}
              >
                1. Terms & Conditions
              </Text>
              <Text
                size="sm"
                style={{
                  color: '#374151',
                  lineHeight: 1.5,
                  textAlign: 'justify'
                }}
              >
                Simsem is an application that aims to promote a local experience in pre-set cities and countries in the Middle East by bringing together Members (signed up members of the Platform with private accounts accessible through personal usernames and passwords) and Sellers (sellers of products and services on the Platform as approved by Simsem) on the Platform within the local laws and regulations. Additional terms and conditions apply to the use of this platform and all services provided therein.
              </Text>

              <Text
                size="sm"
                style={{
                  color: '#f59e0b',
                  fontWeight: 600,
                  marginBottom: '8px',
                  marginTop: '12px'
                }}
              >
                2. Privacy Policy
              </Text>
              <Text
                size="sm"
                style={{
                  color: '#374151',
                  lineHeight: 1.5,
                  textAlign: 'justify'
                }}
              >
                Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application. Please read this privacy policy carefully.
              </Text>
            </div>

            {/* Checkbox */}
            <Group gap="xs" style={{ alignItems: 'flex-start', marginBottom: '16px' }}>
              <Checkbox
                checked={agreed}
                onChange={(event) => setAgreed(event.currentTarget.checked)}
                size="sm"
                style={{ marginTop: '2px' }}
              />
              <Text size="sm" style={{ color: '#374151', lineHeight: 1.4 }}>
                I have read and accepted the{' '}
                <Anchor
                  href="#"
                  style={{
                    color: '#1e3a8a',
                    textDecoration: 'underline',
                    fontWeight: 500
                  }}
                >
                  Terms & Conditions
                </Anchor>
                {' '}and{' '}
                <Anchor
                  href="#"
                  style={{
                    color: '#1e3a8a',
                    textDecoration: 'underline',
                    fontWeight: 500
                  }}
                >
                  Privacy Policy
                </Anchor>
              </Text>
            </Group>

            {/* Buttons */}
            <Stack gap="xs">
              <Button
                fullWidth
                size="md"
                onClick={handleAccept}
                disabled={!agreed}
                style={{
                  backgroundColor: agreed ? '#f59e0b' : '#d1d5db',
                  color: agreed ? 'white' : '#9ca3af',
                  border: 'none',
                  borderRadius: '6px',
                  height: '44px',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                Agree & Continue
              </Button>

              <Button
                fullWidth
                variant="filled"
                size="md"
                onClick={handleCancel}
                style={{
                  backgroundColor: '#d1d5db',
                  color: '#6b7280',
                  border: 'none',
                  borderRadius: '6px',
                  height: '44px',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
