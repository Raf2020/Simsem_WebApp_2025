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
  Badge
} from '@mantine/core';
import { IconEye } from '@tabler/icons-react';

interface BasicInformationStepProps {
  onNext: () => void;
}

const tourCategories = [
  'Adventure & Outdoor',
  'Cultural & Historical',
  'Food & Culinary',
  'Nature & Wildlife',
  'City Tours',
  'Art & Museums',
  'Photography',
  'Nightlife & Entertainment',
  'Wellness & Spiritual',
  'Sports & Fitness',
  'Family Friendly',
  'Luxury & Premium',
  'Day Trips',
  'Multi-day Tours',
  'Private Tours',
  'Walking Tours',
  'Boat Tours'
];

export default function BasicInformationStep({ onNext }: BasicInformationStepProps) {
  const [tourTitle, setTourTitle] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tourOverview, setTourOverview] = useState('');

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const isFormValid = tourTitle.trim() !== '' && selectedCategories.length > 0 && tourOverview.trim() !== '';

  return (
    <Box
      w={"100%"}
      p={{ base: 0, sm: 50 }}
      style={{
        borderRadius: "20px",
        gap: "80px",
        backgroundColor: "#FFFFFF"
      }}
    >

      <Stack gap={80}>
        <Title
          order={2}
          style={{
            fontFamily: 'DM Serif Display',
            fontWeight: 400,
            fontSize: '30px',
            lineHeight: '100%',
            letterSpacing: '0px',
            color: '#0D2E61',
            marginBottom: '0px'
          }}
        >
          Basic Information
        </Title>

        {/* Tour Title */}
        <Stack gap={10}>
          <Text
            style={{
              fontFamily: 'Barlow',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#3D3D3D'
            }}
          >
            Tour Title
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
            Create a captivating title that highlights what makes your experience unique
          </Text>
          <TextInput
            placeholder="e.g., Hidden Gems of Dahshur Pyramids"
            value={tourTitle}
            onChange={(event) => setTourTitle(event.currentTarget.value)}
            styles={{
              input: {
                width: '100%',
                maxWidth: '1084px',
                height: '59px',
                borderRadius: '10px',
                padding: '14px 15px',
                fontFamily: 'Barlow',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'justify',
                border: '1px solid #d1d5db',
                '&::placeholder': {
                  color: '#3D3D3D80'
                }
              }
            }}
          />
        </Stack>

        {/* Tour Category */}
        <Stack gap={10}>
          <Text
            style={{
              fontFamily: 'Barlow',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#3D3D3D'
            }}
          >
            Tour Category
          </Text>
          <Text
            style={{
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '16px'
            }}
          >
            Select categories that best describe your experience
          </Text>
          <Group gap={10}>
            {tourCategories.map((category) => (
              <Button
                key={category}
                variant="filled"
                onClick={() => toggleCategory(category)}
                style={{
                  height: '78px',
                  borderRadius: '10px',
                  padding: '30px 20px',
                  backgroundColor: selectedCategories.includes(category) ? '#0F4C5C' : '#D9D9D94D',
                  color: selectedCategories.includes(category) ? '#FFFFFF' : '#3D3D3D80',
                  cursor: 'pointer',
                  fontFamily: 'Barlow',
                  fontWeight: 500,
                  fontSize: '14px',
                  border: 'none',
                  '&:hover': {
                    backgroundColor: selectedCategories.includes(category) ? '#0F4C5C' : '#D9D9D94D'
                  }
                }}
              >
                {category}
              </Button>
            ))}
          </Group>
        </Stack>

        {/* Tour Overview */}
        <Stack gap={10}>
          <Text
            style={{
              fontFamily: 'Barlow',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#3D3D3D',
              marginBottom: '8px'
            }}
          >
            Tour Overview
          </Text>
          <Textarea
            placeholder="Write a captivating overview that gives travelers a taste of the adventure ahead..."
            value={tourOverview}
            onChange={(event) => setTourOverview(event.currentTarget.value)}
            styles={{
              input: {
                maxWidth: '100%',
                width: 1084,
                height: '118px',
                borderRadius: '10px',
                borderWidth: '1px',
                padding: '20px',
                fontFamily: 'Barlow',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'justify',
                border: '1px solid #d1d5db',
                '&::placeholder': {
                  color: '#3D3D3D80'
                }
              }
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
