'use client';

import { Box, Text, Title, Stack, Badge, Group } from '@mantine/core';
import { useBasicInformation } from '../contexts/BasicInformationContext';

export default function FormDataPreview() {
  const { form } = useBasicInformation();
  
  const { watch, formState: { errors, isValid } } = form;
  
  // Watch all form values
  const formData = watch();
  
  return (
    <Box
      p={20}
      style={{
        backgroundColor: '#f8fafc',
        borderRadius: '10px',
        border: '1px solid #e5e7eb',
        marginTop: '20px'
      }}
    >
      <Stack gap={16}>
        <Title
          order={4}
          style={{
            fontFamily: 'Barlow',
            fontWeight: 700,
            fontSize: '18px',
            color: '#0D2E61'
          }}
        >
          Form Data Preview (Real-time)
        </Title>
        
        <Stack gap={12}>
          <div>
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 600,
                fontSize: '14px',
                color: '#3D3D3D'
              }}
            >
              Tour Title:
            </Text>
            <Text
              style={{
                fontFamily: 'Barlow',
                fontSize: '14px',
                color: formData.tourTitle ? '#000' : '#9ca3af'
              }}
            >
              {formData.tourTitle || 'Not entered yet'}
            </Text>
            {errors.tourTitle && (
              <Text style={{ color: '#ef4444', fontSize: '12px' }}>
                {errors.tourTitle.message}
              </Text>
            )}
          </div>
          
          <div>
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 600,
                fontSize: '14px',
                color: '#3D3D3D'
              }}
            >
              Selected Categories ({formData.selectedCategories?.length || 0}):
            </Text>
            <Group gap={8} mt={4}>
              {formData.selectedCategories?.length > 0 ? (
                formData.selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    size="sm"
                    style={{
                      backgroundColor: '#0F4C5C',
                      color: 'white'
                    }}
                  >
                    {category}
                  </Badge>
                ))
              ) : (
                <Text style={{ color: '#9ca3af', fontSize: '14px' }}>
                  No categories selected
                </Text>
              )}
            </Group>
            {errors.selectedCategories && (
              <Text style={{ color: '#ef4444', fontSize: '12px' }}>
                {errors.selectedCategories.message}
              </Text>
            )}
          </div>
          
          <div>
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 600,
                fontSize: '14px',
                color: '#3D3D3D'
              }}
            >
              Tour Overview:
            </Text>
            <Text
              style={{
                fontFamily: 'Barlow',
                fontSize: '14px',
                color: formData.tourOverview ? '#000' : '#9ca3af',
                maxWidth: '100%',
                wordBreak: 'break-word'
              }}
            >
              {formData.tourOverview || 'Not entered yet'}
            </Text>
            {errors.tourOverview && (
              <Text style={{ color: '#ef4444', fontSize: '12px' }}>
                {errors.tourOverview.message}
              </Text>
            )}
          </div>
          
          <div>
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 600,
                fontSize: '14px',
                color: '#3D3D3D'
              }}
            >
              Form Status:
            </Text>
            <Badge
              color={isValid ? 'green' : 'red'}
              size="sm"
            >
              {isValid ? 'Valid' : 'Invalid'}
            </Badge>
          </div>
        </Stack>
      </Stack>
    </Box>
  );
}
