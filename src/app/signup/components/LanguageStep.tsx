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

interface Language {
  name: string;
  proficiency: string;
  badgeColor: string;
  badgeTextColor: string;
}

const languages: Language[] = [
  {
    name: "Arabic",
    proficiency: "NATIVE",
    badgeColor: "#0D2E610D",
    badgeTextColor: "#0D2E61"
  },
  {
    name: "English",
    proficiency: "FLUENT",
    badgeColor: "#0D2E610D",
    badgeTextColor: "#0D2E61"
  },
  {
    name: "French",
    proficiency: "CONVERSATIONAL",
    badgeColor: "#0D2E610D",
    badgeTextColor: "#0D2E61"
  }
];

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
        p={{ base: "sm", sm: "xl" }}
        py={"xl"}
        style={{
          width: '100%',
          margin: '0 auto'
        }}
      >
        <Stack gap={"lg"}>
          <Stack gap={5}>
            <Title
              order={2}
              style={{
                fontFamily: 'Barlow',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#0D2E61',
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
          </Stack>
          <Group gap={12}>
            {languages.map((language, index) => (
              <Button
                key={index}
                variant="light"
                rightSection={
                  <Badge
                    size="xl"
                    style={{
                      backgroundColor: language.badgeColor,
                      color: language.badgeTextColor,
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
                    {language.proficiency}
                  </Badge>
                }
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
                  height: '51px',
                  padding: '',
                  gap: '10px'
                }}
              >
                {language.name}
              </Button>
            ))}
          </Group>

          <Box >
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
        </Stack>
      </Paper>
      {/* Buttons */}
      <Group
        justify="space-between"
        styles={{
          root: {
            '@media (max-width: 48em)': {
              flexDirection: 'column !important',
              gap: '12px !important'
            }
          }
        }}
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
      </Group>
    </Stack >

  );
}
