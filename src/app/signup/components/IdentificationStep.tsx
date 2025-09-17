'use client';

import { useState } from 'react';
import {
  Text,
  Title,
  Checkbox,
  Button,
  Stack,
  Box,
  Group,
  Stepper
} from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

interface IdentificationStepProps {
  onComplete: () => void;
  onCancel: () => void;
}

export default function IdentificationStep({ onComplete, onCancel }: IdentificationStepProps) {
  const [frontSideFile, setFrontSideFile] = useState<File | null>(null);
  const [backSideFile, setBackSideFile] = useState<File | null>(null);
  const [isCertifiedGuide, setIsCertifiedGuide] = useState(false);

  return (
    <Box
    >
      <Stepper
        active={0}
        size="sm"
        styles={{
          stepIcon: {
            backgroundColor: 'white',
            color: '#1e3a8a',
            border: '2px solid white',
            fontWeight: 600,
            borderRadius: '50%'
          },
          stepBody: {
            marginTop: '8px'
          },
          stepLabel: {
            fontSize: '12px',
            fontWeight: 500,
            textAlign: 'center'
          },
          separator: {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            height: '2px'
          }
        }}
      >
        <Stepper.Step label="About you" />
        <Stepper.Step label="Language" />
        <Stepper.Step label="Services" />
        <Stepper.Step label="Payment" />
        <Stepper.Step label="Account" />
      </Stepper>
      <Stack gap="lg">
        {/* Identification Card Section */}
        <Box>
          <Title
            order={3}
            style={{
              color: '#1f2937',
              fontWeight: 600,
              fontSize: '18px',
              marginBottom: '8px'
            }}
          >
            Identification Card
          </Title>
          <Text
            size="sm"
            style={{
              color: '#6b7280',
              marginBottom: '20px'
            }}
          >
            It is important to upload your ID to verify your identity.
          </Text>

          {/* ID Card Front Side */}
          <Box style={{ marginBottom: '20px' }}>
            <Group gap="xs" style={{ marginBottom: '8px' }}>
              <Text
                size="sm"
                style={{
                  color: '#374151',
                  fontWeight: 500
                }}
              >
                ID Card Front Side
              </Text>
              <Text
                size="xs"
                style={{
                  color: '#ef4444',
                  fontWeight: 500
                }}
              >
                *
              </Text>
            </Group>

            <Box
              style={{
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                padding: '40px 20px',
                textAlign: 'center',
                backgroundColor: '#f9fafb',
                cursor: 'pointer'
              }}
            >
              <IconUpload size={24} color="#6b7280" style={{ marginBottom: '8px' }} />
              <Text size="sm" style={{ color: '#6b7280' }}>
                Upload Document
              </Text>
            </Box>
          </Box>

          {/* ID Card Back Side */}
          <Box style={{ marginBottom: '20px' }}>
            <Group gap="xs" style={{ marginBottom: '8px' }}>
              <Text
                size="sm"
                style={{
                  color: '#374151',
                  fontWeight: 500
                }}
              >
                ID Card Back Side
              </Text>
              <Text
                size="xs"
                style={{
                  color: '#ef4444',
                  fontWeight: 500
                }}
              >
                *
              </Text>
            </Group>

            <Box
              style={{
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                padding: '40px 20px',
                textAlign: 'center',
                backgroundColor: '#f9fafb',
                cursor: 'pointer'
              }}
            >
              <IconUpload size={24} color="#6b7280" style={{ marginBottom: '8px' }} />
              <Text size="sm" style={{ color: '#6b7280' }}>
                Upload Document
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Certified Tour Guide Section */}
        <Box
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px'
          }}
        >
          <Group gap="xs" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
            <Checkbox
              checked={isCertifiedGuide}
              onChange={(event) => setIsCertifiedGuide(event.currentTarget.checked)}
              size="sm"
              style={{ marginTop: '2px' }}
            />
            <Box>
              <Group gap="xs">
                <Text
                  size="sm"
                  style={{
                    color: '#374151',
                    fontWeight: 500
                  }}
                >
                  I am a certified Tour Guide
                </Text>
                <Text
                  size="xs"
                  style={{
                    color: '#3b82f6',
                    fontWeight: 500,
                    textTransform: 'uppercase'
                  }}
                >
                  OPTIONAL
                </Text>
              </Group>
              <Text
                size="sm"
                style={{
                  color: '#6b7280',
                  marginTop: '4px'
                }}
              >
                This is optional but when ticked, you will be asked to upload your Guide Certificate
              </Text>
            </Box>
          </Group>
        </Box>

        {/* Buttons */}
        <Group justify="space-between">
          <Button
            variant="filled"
            size="md"
            onClick={onCancel}
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
            Cancel
          </Button>

          <Button
            size="md"
            onClick={onComplete}
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
        </Group>
      </Stack>
    </Box>


  );
}
