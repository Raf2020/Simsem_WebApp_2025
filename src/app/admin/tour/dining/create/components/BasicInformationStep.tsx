'use client';

import {
  Text,
  Title,
  Button,
  Stack,
  Box,
  Group,
  TextInput,
  Textarea,
  Checkbox
} from '@mantine/core';
import { useBasicInformation } from '../contexts/BasicInformationContext';

interface BasicInformationStepProps {
  onNext: () => void;
}

const tourCategories = [
  'Restaurant', 'Home'
];

export default function BasicInformationStep({ onNext }: BasicInformationStepProps) {
  const { form, toggleCategory, isFormValid } = useBasicInformation();

  const { register, watch, formState: { errors } } = form;

  // Watch selected categories for real-time updates
  const selectedCategories = watch('selectedCategories');

  return (
    <Box
      w={"100%"}
      py={{ base: 0, sm: 50 }}
      style={{
        borderRadius: "20px",
        gap: "50px",
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
            Dining Tour Title
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
            placeholder="e.g., Ultimate Breakafst in Istanbul"
            {...register('tourTitle')}
            error={errors.tourTitle?.message}
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
                border: errors.tourTitle ? '1px solid #ef4444' : '1px solid #d1d5db',
                '&::placeholder': {
                  color: '#3D3D3D80'
                }
              }
            }}
          />
          {errors.tourTitle && (
            <Text
              size="sm"
              style={{
                fontFamily: 'Barlow',
                fontWeight: 400,
                marginTop: '5px',
                color: '#ef4444'
              }}
            >
              {errors.tourTitle.message}
            </Text>
          )}
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
            Where are you hosting this meal
          </Text>

          <Group gap={10}>
            {tourCategories.map((category) => (
              <Checkbox
                label={category}
                key={category}
                variant="filled"
                checked={watch("selectedCategories").includes(category)}
                onChange={() => toggleCategory(category)}
                style={{
                  height: '78px',
                  borderRadius: '10px',
                  padding: '30px 20px',
                  color: '#3D3D3D80',
                  cursor: 'pointer',
                  fontFamily: 'Barlow',
                  fontWeight: 500,
                  fontSize: '14px',
                  border: 'none',
                  '&:hover': {
                    backgroundColor: selectedCategories.includes(category) ? '#0F4C5C' : '#D9D9D94D'
                  }
                }}
              />

            ))}
          </Group>

          {errors.selectedCategories && (
            <Text
              size="sm"
              style={{
                fontFamily: 'Barlow',
                fontWeight: 400,
                marginTop: '5px',
                color: '#ef4444'
              }}
            >
              {errors.selectedCategories.message}
            </Text>
          )}

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
            Dining Tour Overview
          </Text>
          <Textarea
            placeholder="Write a captivating overview that gives travelers a taste of the adventure ahead..."
            {...register('tourOverview')}
            error={errors.tourOverview?.message}
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
                border: errors.tourOverview ? '1px solid #ef4444' : '1px solid #d1d5db',
                '&::placeholder': {
                  color: '#3D3D3D80'
                }
              }
            }}
          />
          {errors.tourOverview && (
            <Text
              size="sm"
              style={{
                fontFamily: 'Barlow',
                fontWeight: 400,
                marginTop: '5px',
                color: '#ef4444'
              }}
            >
              {errors.tourOverview.message}
            </Text>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
