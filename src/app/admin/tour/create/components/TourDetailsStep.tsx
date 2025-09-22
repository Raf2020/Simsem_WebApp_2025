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
  Textarea,
  Paper,
  Flex,
  NumberInput,
  Select,
  FileInput
} from '@mantine/core';
import { IconEye, IconUpload } from '@tabler/icons-react';

interface TourDetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function TourDetailsStep({ onNext, onBack }: TourDetailsStepProps) {
  const [duration, setDuration] = useState<string | null>('');
  const [maxParticipants, setMaxParticipants] = useState<string | number>('');
  const [price, setPrice] = useState<string | number>('');
  const [meetingPoint, setMeetingPoint] = useState('');
  const [inclusions, setInclusions] = useState('');
  const [exclusions, setExclusions] = useState('');
  const [requirements, setRequirements] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const isFormValid = duration && maxParticipants && price && meetingPoint.trim() !== '';

  return (
    <Box style={{ width: "100%" }}>
        <Stack gap="xl">
          <Title
            order={2}
            style={{
              fontFamily: 'Barlow',
              fontWeight: 600,
              fontSize: '24px',
              color: '#0D2E61',
              marginBottom: '8px'
            }}
          >
            Tour Details
          </Title>

          {/* Duration and Participants */}
          <Group grow>
            <Stack gap="xs">
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#1f2937'
                }}
              >
                Duration
              </Text>
              <Select
                placeholder="Select duration"
                value={duration}
                onChange={setDuration}
                data={[
                  { value: '1-2 hours', label: '1-2 hours' },
                  { value: '3-4 hours', label: '3-4 hours' },
                  { value: '5-6 hours', label: '5-6 hours' },
                  { value: 'Full day', label: 'Full day' },
                  { value: '2 days', label: '2 days' },
                  { value: '3+ days', label: '3+ days' }
                ]}
                styles={{
                  input: {
                    backgroundColor: '#f9fafb',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontFamily: 'Barlow'
                  }
                }}
              />
            </Stack>

            <Stack gap="xs">
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#1f2937'
                }}
              >
                Max Participants
              </Text>
              <NumberInput
                placeholder="e.g., 8"
                value={maxParticipants}
                onChange={setMaxParticipants}
                min={1}
                max={50}
                styles={{
                  input: {
                    backgroundColor: '#f9fafb',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontFamily: 'Barlow'
                  }
                }}
              />
            </Stack>
          </Group>

          {/* Price and Meeting Point */}
          <Group grow>
            <Stack gap="xs">
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#1f2937'
                }}
              >
                Price per Person (USD)
              </Text>
              <NumberInput
                placeholder="e.g., 75"
                value={price}
                onChange={setPrice}
                min={0}
                decimalScale={2}
                styles={{
                  input: {
                    backgroundColor: '#f9fafb',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontFamily: 'Barlow'
                  }
                }}
              />
            </Stack>

            <Stack gap="xs">
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#1f2937'
                }}
              >
                Meeting Point
              </Text>
              <TextInput
                placeholder="e.g., Hotel lobby, specific address"
                value={meetingPoint}
                onChange={(event) => setMeetingPoint(event.currentTarget.value)}
                styles={{
                  input: {
                    backgroundColor: '#f9fafb',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontFamily: 'Barlow'
                  }
                }}
              />
            </Stack>
          </Group>

          {/* What's Included */}
          <Stack gap="xs">
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 600,
                fontSize: '16px',
                color: '#1f2937'
              }}
            >
              What's Included
            </Text>
            <Textarea
              placeholder="List what's included in the tour (transportation, meals, equipment, etc.)"
              value={inclusions}
              onChange={(event) => setInclusions(event.currentTarget.value)}
              minRows={3}
              styles={{
                input: {
                  backgroundColor: '#f9fafb',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontFamily: 'Barlow'
                }
              }}
            />
          </Stack>

          {/* What's Not Included */}
          <Stack gap="xs">
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 600,
                fontSize: '16px',
                color: '#1f2937'
              }}
            >
              What's Not Included
            </Text>
            <Textarea
              placeholder="List what's not included (personal expenses, tips, etc.)"
              value={exclusions}
              onChange={(event) => setExclusions(event.currentTarget.value)}
              minRows={3}
              styles={{
                input: {
                  backgroundColor: '#f9fafb',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontFamily: 'Barlow'
                }
              }}
            />
          </Stack>

          {/* Requirements */}
          <Stack gap="xs">
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 600,
                fontSize: '16px',
                color: '#1f2937'
              }}
            >
              Requirements & Recommendations
            </Text>
            <Textarea
              placeholder="Any fitness requirements, age restrictions, what to bring, etc."
              value={requirements}
              onChange={(event) => setRequirements(event.currentTarget.value)}
              minRows={3}
              styles={{
                input: {
                  backgroundColor: '#f9fafb',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontFamily: 'Barlow'
                }
              }}
            />
          </Stack>

          {/* Images */}
          <Stack gap="xs">
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 600,
                fontSize: '16px',
                color: '#1f2937'
              }}
            >
              Tour Images
            </Text>
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 400,
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px'
              }}
            >
              Upload high-quality images that showcase your tour experience
            </Text>
            <FileInput
              placeholder="Click to upload images"
              multiple
              accept="image/*"
              leftSection={<IconUpload size={16} />}
              value={images}
              onChange={setImages}
              styles={{
                input: {
                  backgroundColor: '#f9fafb',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontFamily: 'Barlow'
                }
              }}
            />
          </Stack>
        </Stack>
    </Box>
  );
}
