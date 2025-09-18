'use client';

import {
  Text,
  Title,
  Button,
  Stack,
  Box,
  Group,
  Badge,
  Paper
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

interface LanguageStepProps {
  onComplete: () => void;
  onBack: () => void;
}



export default function LanguageStep({ onComplete, onBack }: LanguageStepProps) {

  return (

    <Stack gap="lg" style={{
      maxWidth: 962,
      width: "100%"
    }}>

      {/* maxWidth: '962px',  */}
      <Paper
        withBorder
        radius="lg"
        p="xl"
        style={{
          width: '100%',
          margin: '0 auto'
        }}
      >
        <Box>
          <Title
            order={2}
            style={{
              fontFamily: 'Barlow',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0px',
              color: '#000000',
              marginBottom: '8px'
            }}
          >
            Languages
          </Title>
          <Text
            style={{
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#6b7280'
            }}
          >
            You can add up to three languages
          </Text>
        </Box>
        <Group gap={12} mt={24}>
          <Button
            variant="light"
            rightSection={<Badge
              size="xs"
              style={{
                backgroundColor: '#0D2E610D',
                color: '#0D2E61',
                marginLeft: '10px',
                fontFamily: 'Barlow',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'justify',
                height: '23px',
                padding: '3px 5px',
                borderRadius: '10px',
                border: '1px solid #3D3D3D1A'
              }}
            >
              NATIVE
            </Badge>}
            style={{
              backgroundColor: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '10px',
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'justify',
              width: '179px',
              height: '51px',
              padding: '',
              gap: '10px'
            }}
          >
            Arabic
          </Button>

     <Button
            variant="light"
            rightSection={<Badge
              size="xs"
              style={{
                backgroundColor: '#0D2E610D',
                color: '#0D2E61',
                marginLeft: '10px',
                fontFamily: 'Barlow',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'justify',
                height: '23px',
                padding: '3px 5px',
                borderRadius: '10px',
                border: '1px solid #3D3D3D1A'
              }}
            >
              FLUENT
            </Badge>}
            style={{
              backgroundColor: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '10px',
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'justify',
              width: '179px',
              height: '51px',
              padding: '',
              gap: '10px'
            }}
          >
            English
          </Button>
          <Button
            variant="light"
            rightSection={<Badge
              size="xs"
              style={{
                backgroundColor: '#0D2E610D',
                color: '#0D2E61',
                marginLeft: '10px',
                fontFamily: 'Barlow',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'justify',
                height: '23px',
                padding: '3px 5px',
                borderRadius: '10px',
                border: '1px solid #3D3D3D1A'
              }}
            >
              CONVERSATIONAL
            </Badge>}
            style={{
              backgroundColor: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '10px',
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'justify',
              width: '179px',
              height: '51px',
              padding: '',
              gap: '10px'
            }}
          >
            French
          </Button>
        </Group>

        <Box mt={16}>
          <Button
            variant="outline"
            leftSection={<IconPlus size={14} />}
            style={{
              fontFamily: 'Barlow',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '100%',
              letterSpacing: '0px',
              color: '#6b7280',
              borderColor: '#d1d5db',
              backgroundColor: 'transparent',
              width: '164px',
              height: '49px',
              padding: '15px 20px',
              borderRadius: '10px',
              borderWidth: '1px',
              gap: '10px'
            }}
          >
            Add Language
          </Button>
        </Box>
      </Paper>
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
    </Stack >

  );
}
