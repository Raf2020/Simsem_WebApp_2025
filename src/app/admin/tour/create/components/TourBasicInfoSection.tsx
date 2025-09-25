'use client';

import {
  Text,
  Button,
  Stack,
  Box,
  Group,
  TextInput,
  Textarea,
  Paper,
  Flex,
  Image
} from '@mantine/core';
import { IconUpload, IconX } from '@tabler/icons-react';
import { useTourDetails } from '../contexts/TourDetailsContext';

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

export default function TourBasicInfoSection() {
  const {
    form,
    addCoverPhoto,
    removeCoverPhoto,
    addGalleryPhoto,
    removeGalleryPhoto,
    createImageFile,
    coverPhotosArray,
    galleryPhotosArray
  } = useTourDetails();

  const { register, formState: { errors } } = form;

  // Watch form values for real-time updates (removed unused variables)

  // File upload handlers
  const handleCoverPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const imageFile = createImageFile(file);
          addCoverPhoto(imageFile);
        }
      });
    }
    // Reset input
    event.target.value = '';
  };

  const handleGalleryPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const imageFile = createImageFile(file);
          addGalleryPhoto(imageFile);
        }
      });
    }
    // Reset input
    event.target.value = '';
  };

  return (
    <Paper
      shadow="xl"
      radius="lg"
      px={{ base: 10, sm: 30 }}
      py={40}
      my={{ base: 'lg', sm: 'xl' }}
      maw={1204}
      w={"100%"}
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        backgroundColor: 'white',
        position: 'relative',
        zIndex: 2
      }}
    >
      <Stack w={"100%"} gap={40}>
        <Stack gap={10} w={"100%"}>
          <Text
            style={{
              fontFamily: 'Barlow',
              fontWeight: 700,
              fontSize: '28px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#0D2E61',
              marginBottom: '8px'
            }}
          >
            What to expect
          </Text>
          <Textarea
            placeholder="Create anticipation!  Describe the sensory details, activities, and moments that will make this experience unforgettable. What will they see, hear, taste, or feel?"
            {...register('whatToExpect')}
            error={errors.whatToExpect?.message}
            styles={{
              input: {
                width: '100%',
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
                border: errors.whatToExpect ? '1px solid #ef4444' : '1px solid #d1d5db',
                '&::placeholder': {
                  color: '#3D3D3D80'
                }
              }
            }}
          />
        </Stack>
        <Stack>
          <Text
            style={{
              fontFamily: 'Barlow',
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#3D3D3D'
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
              marginBottom: '16px'
            }}
          >
            Upload high-quality photos that capture the magic of your experience. Include action shots, scenic views, and happy travelers to help guests visualize their adventure.
          </Text>
          <Stack gap={40}>
            <Stack>
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
                Cover Photos
              </Text>
              <input
                type="file"
                id="cover-photos-input"
                multiple
                accept="image/*"
                onChange={handleCoverPhotoUpload}
                style={{ display: 'none' }}
              />
              <Box
                mih={221}
                onClick={() => document.getElementById('cover-photos-input')?.click()}
                style={{
                  width: '100%',
                  border: '1px solid #0D2E61',
                  borderStyle: "dashed",
                  borderRadius: '10px',
                  padding: '60px 40px',
                  textAlign: 'center',
                  backgroundColor: '#0D2E611A',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px'
                }}
              >
                <IconUpload
                  size={36}
                  color="#3D3D3DB2"
                  style={{
                    opacity: 0.7
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 400,
                    fontSize: '20px',
                    color: '#3D3D3D80',
                    lineHeight: '100%'
                  }}
                >
                  Upload photos & videos of your experience
                </Text>
                <Button
                  variant="outline"
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#3D3D3D',
                    borderColor: '#3D3D3D1A',
                    backgroundColor: '#F0F0F0',
                    borderRadius: '8px',
                    padding: '12px 24px'
                  }}
                >
                  Choose Media
                </Button>
              </Box>
              <Flex gap={10}>
                {coverPhotosArray.fields.map((photo: any, index: number) => (
                  <Box
                    key={photo.id}
                    w={{ base: 118 }}
                    h={{ base: 100 }}
                    style={{
                      overflow: "hidden",
                      position: "relative"
                    }}
                  >
                    <Image fit="fill" alt={"Tour Cover"} src={photo.url} />
                    <Box
                      w={20}
                      h={20}
                      pos={"absolute"}
                      top={"3.5px"}
                      right={"3.5px"}
                      onClick={() => removeCoverPhoto(index)}
                      style={{
                        zIndex: 10,
                        cursor: "pointer"
                      }}
                    >
                      <IconX
                        width={"100%"}
                        height={"100%"}
                        color="#FFFFFF"
                        style={{ opacity: 1 }}
                      />
                    </Box>
                  </Box>
                ))}
              </Flex>
            </Stack>
            <Stack>
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
                Gallery Photos
              </Text>
              <input
                type="file"
                id="gallery-photos-input"
                multiple
                accept="image/*"
                onChange={handleGalleryPhotoUpload}
                style={{ display: 'none' }}
              />
              <Box
                mih={221}
                onClick={() => document.getElementById('gallery-photos-input')?.click()}
                style={{
                  width: '100%',
                  border: '1px solid #0D2E61',
                  borderStyle: "dashed",
                  borderRadius: '10px',
                  padding: '60px 40px',
                  textAlign: 'center',
                  backgroundColor: '#0D2E611A',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px'
                }}
              >
                <IconUpload
                  size={36}
                  color="#3D3D3DB2"
                  style={{
                    opacity: 0.7
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 400,
                    fontSize: '20px',
                    color: '#3D3D3D80',
                    lineHeight: '100%'
                  }}
                >
                  Upload photos & videos of your experience
                </Text>
                <Button
                  variant="outline"
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#3D3D3D',
                    borderColor: '#3D3D3D1A',
                    backgroundColor: '#F0F0F0',
                    borderRadius: '8px',
                    padding: '12px 24px'
                  }}
                >
                  Choose Media
                </Button>
              </Box>
              <Flex gap={10}>
                {galleryPhotosArray.fields.map((photo: any, index: number) => (
                  <Box
                    key={photo.id}
                    w={{ base: 118 }}
                    h={{ base: 100 }}
                    style={{
                      overflow: "hidden",
                      position: "relative"
                    }}
                  >
                    <Image fit="fill" alt={"Tour Cover"} src={photo.url} />
                    <Box
                      w={20}
                      h={20}
                      pos={"absolute"}
                      top={"3.5px"}
                      right={"3.5px"}
                      onClick={() => removeGalleryPhoto(index)}
                      style={{
                        zIndex: 10,
                        cursor: "pointer"
                      }}
                    >
                      <IconX
                        width={"100%"}
                        height={"100%"}
                        color="#FFFFFF"
                        style={{ opacity: 1 }}
                      />
                    </Box>
                  </Box>
                ))}
              </Flex>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
