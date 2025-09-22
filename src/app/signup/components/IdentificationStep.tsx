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
  TextInput,
  Select,
  Textarea,
  Avatar,
  Paper,
  Grid,
  Image,
  Flex
} from '@mantine/core';
import { IconUpload, IconUser, IconCamera } from '@tabler/icons-react';
import { Country, City, State } from 'country-state-city';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface IdentificationStepProps {
  onComplete: () => void;
  onCancel: () => void;
}

export default function IdentificationStep({ onComplete, onCancel }: IdentificationStepProps) {
  const [frontSideFile, setFrontSideFile] = useState<File | null>(null);
  const [backSideFile, setBackSideFile] = useState<File | null>(null);
  const [isCertifiedGuide, setIsCertifiedGuide] = useState(false);

  // Profile form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [introduction, setIntroduction] = useState('');

  // Prepare countries data for Select component using country-state-city
  const countryOptions = Country.getAllCountries()
    .map((country) => ({
      value: country.isoCode,
      label: country.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // Get states for selected country using country-state-city
  const getCityOptions = () => {
    if (!country) return [];
    const states = State.getStatesOfCountry(country);
    if (!states) return [];

    return states
      .map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  };

  // Handle country change - reset city when country changes
  const handleCountryChange = (value: string | null) => {
    setCountry(value || '');
    setCity(''); // Reset city when country changes
  };

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
        <Stack gap="lg">
          {/* Avatar and Photo Upload */}
          <Flex
            direction={{ base: "column", sm: "row" }}
            align={"center"}
            gap={"md"}
          >
            <Avatar
              size={80}
              radius="xl"
              style={{
                backgroundColor: '#e5e7eb',
                color: '#6b7280'
              }}
            >
              <IconUser size={40} />
            </Avatar>
            <Flex
              direction={"column"}
              align={{ base: "center", sm: "flex-start" }}
            >
              <Button
                variant="outline"
                leftSection={<IconCamera size={16} />}
                size="sm"
                style={{
                  borderColor: '#d1d5db',
                  color: '#6b7280'
                }}
              >
                Change Photo
              </Button>
              <Text size="xs" c="dimmed" mt={4}>
                JPG, PNG, Max 2MB
              </Text>
            </Flex>
          </Flex>

          {/* Name Fields */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="First Name"
                placeholder="Ahmed"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                styles={{
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
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Last Name"
                placeholder="Ahmed"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                styles={{
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
                }}
              />
            </Grid.Col>
          </Grid>

          {/* Email and Phone */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Email"
                placeholder="ahmed@gmail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                styles={{
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
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Box>
                <Text
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#000000',
                    marginBottom: '8px'
                  }}
                >
                  Phone
                </Text>
                <PhoneInput

                  country={'us'}
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  inputStyle={{
                    fontFamily: 'Barlow',
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    width: '100%',
                    height: '48px',
                    padding: '14px 15px',
                    color: '#000000'
                  }}
                  buttonStyle={{
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px 0 0 10px',
                    borderRight: 'none',
                    height: '48px'
                  }}
                  containerStyle={{
                    width: '100%'
                  }}
                />
              </Box>
            </Grid.Col>
          </Grid>

          {/* Country and City */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="Country"
                placeholder="Select Country"
                value={country}
                onChange={handleCountryChange}
                data={countryOptions}
                searchable
                styles={{
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
                    }
                  }
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="State/Province"
                placeholder="Select State/Province"
                value={city}
                onChange={(value) => setCity(value || '')}
                data={getCityOptions()}
                searchable
                disabled={!country}
                styles={{
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
                    }
                  }
                }}
              />
            </Grid.Col>
          </Grid>

          {/* Introduction */}
          <Box>
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#000000',
                marginBottom: '8px'
              }}
            >
              Introduction
            </Text>
            <Textarea
              placeholder="Welcome to Jordan! I'm Ahmed, a passionate local guide with 8 years of experience showing travelers the hidden gems of my beautiful country. From the ancient wonders of Petra to the magical deserts of Wadi Rum, I love sharing authentic experiences that connect you with our rich culture and history."
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              minRows={4}
              styles={{
                input: {
                  fontFamily: 'Barlow',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  textAlign: 'justify',
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '14px 15px',
                  width: '902px',
                  height: '120px',
                  maxWidth: '100%',
                  '&::placeholder': {
                    color: '#9ca3af',
                    fontFamily: 'Barlow',
                    fontWeight: 400,
                    fontSize: '18px',
                    textAlign: 'justify'
                  },
                  '&:focus': {
                    color: '#000000'
                  }
                }
              }}
            />
          </Box>
        </Stack>
      </Paper>
      {/* Identification Card Section */}
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
        <Box>
          <Title
            order={3}

            style={{
              color: '#0D2E61',

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
                  color: '#0D2E61',


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
                border: '2px dashed #0D2E61',
                borderRadius: '8px',
                padding: '40px 20px',
                textAlign: 'center',
                backgroundColor: '#0D2E611A',
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
                  color: '#0D2E61',
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
                border: '2px dashed #0D2E61',
                borderRadius: '8px',
                padding: '40px 20px',
                textAlign: 'center',
                backgroundColor: '#0D2E611A',
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
      </Paper>


      {/* Certified Tour Guide Section */}
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
        {/* Guide Certificate Upload - Show when certification is checked */}
        {isCertifiedGuide && (
          <Box style={{ marginTop: '20px' }}>
            <Group gap="xs" style={{ marginBottom: '8px' }}>
              <Text
                size="sm"
                style={{
                  color: '#0D2E61',


                  fontWeight: 500
                }}
              >
                Tour Guide Certificate
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
                border: '2px dashed #0D2E61',
                borderRadius: '8px',
                padding: '40px 20px',
                textAlign: 'center',
                backgroundColor: '#0D2E611A',
                cursor: 'pointer'
              }}
            >
              <IconUpload size={24} color="#6b7280" style={{ marginBottom: '8px' }} />
              <Text size="sm" style={{ color: '#6b7280' }}>
                Upload Document
              </Text>
            </Box>
          </Box>
        )}

      </Paper>

      {/* Buttons */}
      <Flex
        justify="space-between"
        gap={12}
        direction={{ base: "column", sm: "row" }}
      >
        <Button
          variant="filled"
          size="md"
          onClick={onCancel}
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
          Cancel
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
