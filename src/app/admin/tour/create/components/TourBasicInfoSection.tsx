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

interface TourBasicInfoSectionProps {
  tourTitle: string;
  setTourTitle: (value: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  tourOverview: string;
  setTourOverview: (value: string) => void;
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

export default function TourBasicInfoSection({
  tourTitle,
  setTourTitle,
  selectedCategories,
  setSelectedCategories,
  tourOverview,
  setTourOverview
}: TourBasicInfoSectionProps) {
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
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
            value={tourOverview}
            onChange={(event) => setTourOverview(event.currentTarget.value)}
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
                border: '1px solid #d1d5db',
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
              <Box
                mih={221}
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
                <Box
                  w={{ base: 118 }}
                  h={{ base: 100 }}
                  style={{
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  <Image fit="fill" alt={"Tour Cover"} src={"/images/building.png"} />
                  <Box
                    w={20}
                    h={20}
                    pos={"absolute"}
                    top={"3.5px"}
                    right={"3.5px"}
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
                Gallery Photo
              </Text>
              <Box
                mih={221}
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
                <Box
                  w={{ base: 118 }}
                  h={{ base: 100 }}
                  style={{
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  <Image fit="fill" alt={"Tour Cover"} src={"/images/building.png"} />
                  <Box
                    w={20}
                    h={20}
                    pos={"absolute"}
                    top={"3.5px"}
                    right={"3.5px"}
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
                <Box
                  w={{ base: 118 }}
                  h={{ base: 100 }}
                  style={{
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  <Image fit="fill" alt={"Tour Cover"} src={"/images/building.png"} />
                  <Box
                    w={20}
                    h={20}
                    pos={"absolute"}
                    top={"3.5px"}
                    right={"3.5px"}
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
                <Box
                  w={{ base: 118 }}
                  h={{ base: 100 }}
                  style={{
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  <Image fit="fill" alt={"Tour Cover"} src={"/images/building.png"} />
                  <Box
                    w={20}
                    h={20}
                    pos={"absolute"}
                    top={"3.5px"}
                    right={"3.5px"}
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
              </Flex>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
