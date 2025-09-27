'use client';

import { useRef } from 'react';
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
import { IconUpload, IconUser, IconCamera, IconTrash } from '@tabler/icons-react';
import { Country, City, State } from 'country-state-city';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useIdentification } from '../contexts/IdentificationContext';

interface IdentificationStepProps {
  onComplete: () => void;
  onCancel: () => void;
}

export default function IdentificationStep({ onComplete, onCancel }: IdentificationStepProps) {
  const { form, handleFileUpload, removeFile, toggleCertification, isFormValid, isCertifiedGuide } = useIdentification();

  // File input refs
  const profilePhotoRef = useRef<HTMLInputElement>(null);
  const frontSideRef = useRef<HTMLInputElement>(null);
  const backSideRef = useRef<HTMLInputElement>(null);
  const certificateRef = useRef<HTMLInputElement>(null);

  // Get form values
  const formValues = form.watch();
  const formErrors = form.formState.errors;

  // Prepare countries data for Select component using country-state-city
  const countryOptions = Country.getAllCountries()
    .map((country) => ({
      value: country.isoCode,
      label: country.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // Get states for selected country using country-state-city
  const getCityOptions = () => {
    if (!formValues.country) return [];
    const states = State.getStatesOfCountry(formValues.country);
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
    form.setValue('country', value || '', { shouldValidate: true, shouldDirty: true });
    form.setValue('city', '', { shouldValidate: true, shouldDirty: true }); // Reset city when country changes
  };

  // File upload handlers
  const handleFileSelect = (fieldName: keyof typeof formValues, inputRef: React.RefObject<HTMLInputElement | null>) => {
    inputRef.current?.click();
  };

  const handleFileChange = (fieldName: keyof typeof formValues, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(fieldName, file);
    }
    // Reset the input value so the same file can be selected again
    event.target.value = '';
  };

  // Handle form submission
  const handleSubmit = () => {
    if (isFormValid) {
      onComplete();
    } else {
      // Trigger validation to show errors
      form.trigger();
    }
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
            <Box style={{ position: 'relative' }}>
              <Avatar
                size={80}
                radius="xl"
                src={formValues.profilePhoto?.url}
                style={{
                  backgroundColor: '#e5e7eb',
                  color: '#6b7280',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
                onClick={() => handleFileSelect('profilePhoto', profilePhotoRef)}
              >
                {!formValues.profilePhoto && <IconUser size={40} />}
              </Avatar>
              {formValues.profilePhoto && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile('profilePhoto');
                  }}
                  p={0}
                  m={0}
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    backgroundColor: '#ef4444',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <IconTrash size={12} color="white" />
                </Button>
              )}
            </Box>
            <Flex
              direction={"column"}
              align={{ base: "center", sm: "flex-start" }}
            >
              <Button
                variant="outline"
                leftSection={<IconCamera size={16} />}
                size="sm"
                onClick={() => handleFileSelect('profilePhoto', profilePhotoRef)}
                style={{
                  borderColor: '#d1d5db',
                  color: '#6b7280'
                }}
              >
                {formValues.profilePhoto ? 'Change Photo' : 'Add Photo'}
              </Button>
              <Text size="xs" c="dimmed" mt={4}>
                JPG, PNG, Max 2MB
              </Text>
              <Text size="xs" c="dimmed" mt={2}>
                Click avatar or button to {formValues.profilePhoto ? 'change' : 'upload'}
              </Text>
            </Flex>
          </Flex>

          {/* Hidden file inputs */}
          <input
            type="file"
            ref={profilePhotoRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => handleFileChange('profilePhoto', e)}
          />
          <input
            type="file"
            ref={frontSideRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => handleFileChange('idCardFrontSide', e)}
          />
          <input
            type="file"
            ref={backSideRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => handleFileChange('idCardBackSide', e)}
          />
          <input
            type="file"
            ref={certificateRef}
            style={{ display: 'none' }}
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange('tourGuideCertificate', e)}
          />

          {/* Name Fields */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="First Name"
                placeholder="Ahmed"
                {...form.register('firstName')}
                error={formErrors.firstName?.message}
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
                {...form.register('lastName')}
                error={formErrors.lastName?.message}
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
                {...form.register('email')}
                error={formErrors.email?.message}
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
                  value={formValues.phone}
                  onChange={(value) => form.setValue('phone', value, { shouldValidate: true, shouldDirty: true })}
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
                {formErrors.phone && (
                  <Text size="sm" c="red" mt={4}>
                    {formErrors.phone.message}
                  </Text>
                )}
              </Box>
            </Grid.Col>
          </Grid>

          {/* Country and City */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select
                label="Country"
                placeholder="Select Country"
                value={formValues.country}
                onChange={handleCountryChange}
                data={countryOptions}
                searchable
                error={formErrors.country?.message}
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
                value={formValues.city}
                onChange={(value) => form.setValue('city', value || '', { shouldValidate: true, shouldDirty: true })}
                data={getCityOptions()}
                searchable
                disabled={!formValues.country}
                error={formErrors.city?.message}
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
              {...form.register('introduction')}
              error={formErrors.introduction?.message}
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

            {formValues.idCardFrontSide ? (
              <Box style={{ position: 'relative', maxWidth: '400px', width: '100%' }} mx={"auto"}>
                <Image
                  src={formValues.idCardFrontSide.url}
                  alt="ID Card Front Side"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb'
                  }}
                />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile('idCardFrontSide');
                  }}
                  p={0}
                  m={0}
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    backgroundColor: '#ef4444',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <IconTrash size={12} color="white" />
                </Button>
              </Box>
            ) : (
              <Box
                onClick={() => handleFileSelect('idCardFrontSide', frontSideRef)}
                style={{
                  border: '2px dashed #0D2E61',
                  borderRadius: '8px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  backgroundColor: '#0D2E611A',
                  cursor: 'pointer',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <IconUpload size={24} color="#6b7280" style={{ marginBottom: '8px' }} />
                <Text size="sm" style={{ color: '#6b7280' }}>
                  Upload Document
                </Text>
              </Box>
            )}
            {formErrors.idCardFrontSide && (
              <Text size="sm" c="red" mt={4}>
                {formErrors.idCardFrontSide.message}
              </Text>
            )}
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

            {formValues.idCardBackSide ? (
              <Box style={{ position: 'relative', maxWidth: '400px', width: '100%' }} mx={"auto"}>
                <Image
                  src={formValues.idCardBackSide.url}
                  alt="ID Card Back Side"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb'
                  }}
                />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile('idCardBackSide');
                  }}
                  p={0}
                  m={0}
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    backgroundColor: '#ef4444',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <IconTrash size={12} color="white" />
                </Button>
              </Box>
            ) : (
              <Box
                onClick={() => handleFileSelect('idCardBackSide', backSideRef)}
                style={{
                  border: '2px dashed #0D2E61',
                  borderRadius: '8px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  backgroundColor: '#0D2E611A',
                  cursor: 'pointer',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <IconUpload size={24} color="#6b7280" style={{ marginBottom: '8px' }} />
                <Text size="sm" style={{ color: '#6b7280' }}>
                  Upload Document
                </Text>
              </Box>
            )}
            {formErrors.idCardBackSide && (
              <Text size="sm" c="red" mt={4}>
                {formErrors.idCardBackSide.message}
              </Text>
            )}
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
            onChange={toggleCertification}
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

            {formValues.tourGuideCertificate ? (
              <Box style={{ position: 'relative', maxWidth: '400px', width: '100%' }} mx={"auto"}>
                {formValues.tourGuideCertificate.type.startsWith('image/') ? (
                  <Image
                    src={formValues.tourGuideCertificate.url}
                    alt="Tour Guide Certificate"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb'
                    }}
                  />
                ) : (
                  <Box
                    style={{
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '40px 20px',
                      textAlign: 'center',
                      backgroundColor: '#0D2E611A',
                      minHeight: '120px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconUpload size={48} color="#0D2E61" />
                    <Text size="sm" style={{ color: '#0D2E61', fontWeight: 500, marginTop: '8px' }}>
                      {formValues.tourGuideCertificate.name}
                    </Text>
                    <Text size="xs" style={{ color: '#6b7280', marginTop: '4px' }}>
                      PDF Document
                    </Text>
                  </Box>
                )}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile('tourGuideCertificate');
                  }}
                  p={0}
                  m={0}
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    backgroundColor: '#ef4444',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <IconTrash size={12} color="white" />
                </Button>
              </Box>
            ) : (
              <Box
                onClick={() => handleFileSelect('tourGuideCertificate', certificateRef)}
                style={{
                  border: '2px dashed #0D2E61',
                  borderRadius: '8px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  backgroundColor: '#0D2E611A',
                  cursor: 'pointer',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <IconUpload size={24} color="#6b7280" style={{ marginBottom: '8px' }} />
                <Text size="sm" style={{ color: '#6b7280' }}>
                  Upload Document
                </Text>
              </Box>
            )}
            {formErrors.tourGuideCertificate && (
              <Text size="sm" c="red" mt={4}>
                {formErrors.tourGuideCertificate.message}
              </Text>
            )}
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
          onClick={() => {
            form.trigger(); // Trigger validation to show errors
            if (isFormValid) {
              handleSubmit();
            }
          }}
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
