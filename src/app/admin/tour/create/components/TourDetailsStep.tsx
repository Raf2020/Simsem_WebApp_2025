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
  Image,
  SimpleGrid
} from '@mantine/core';
import { IconEye, IconUpload, IconX, IconPlus } from '@tabler/icons-react';

interface BasicInformationStepProps {
  onNext: () => void;
  onBack: () => void;
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

export default function BasicInformationStep({ onNext, onBack }: BasicInformationStepProps) {
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

      <Stack gap={20}>
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
          Tour Details
        </Title>
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
          <Stack gap={30} w="100%">
            {/* Title */}
            <Title
              order={2}
              style={{
                fontFamily: 'Barlow',
                fontWeight: 700,
                fontSize: '28px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#0D2E61',
                marginBottom: '0px'
              }}
            >
              What&apos;s included & not included
            </Title>

            {/* Two Column Layout */}
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20}>
              {/* What's Included Column */}
              <Paper
                style={{
                  borderRadius: '20px',
                  gap: '30px',
                  paddingTop: '30px',
                  paddingRight: '20px',
                  paddingBottom: '30px',
                  paddingLeft: '20px',
                  borderTopWidth: '5px',
                  borderRightWidth: '1px',
                  borderBottomWidth: '1px',
                  borderLeftWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#16A24966',
                }}
              >
                <Stack gap={16}>
                  <Title
                    order={3}
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 700,
                      fontSize: '25px',
                      color: '#22C55E'
                    }}
                  >
                    This tour includes...
                  </Title>

                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 400,
                      fontSize: '20px',
                      color: '#6B7280'
                    }}
                  >
                    List everything travelers get with their booking
                  </Text>

                  <Stack gap={12}>
                    {['Professional Local Guide', 'Transportation', 'Refreshments', 'Photography Assistance'].map((item, index) => (
                      <Group key={index} justify="space-between" align="center" h={52} style={{
                        background: "#3D3D3D08",
                        borderRadius: 10
                      }}
                        px={5}
                        py={10}

                      >
                        <Text
                          style={{
                            fontFamily: 'Barlow',
                            fontWeight: 500,
                            fontSize: '19px',
                            color: '#16A249'
                          }}
                        >
                          {item}
                        </Text>
                        <Box
                          style={{
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <IconX width={"100%"} height={"100%"} color="#6B7280" />
                        </Box>
                      </Group>
                    ))}
                  </Stack>

                  <Group gap={0} w={"100%"}>
                    <TextInput
                      placeholder="Add inclusion"
                      color='#3D3D3DB2'
                      flex={1}
                      styles={{
                        input: {
                          fontFamily: 'Barlow',
                          fontWeight: 700,
                          fontSize: '19px',
                          height: '59px',
                          paddingRight: 30,
                          paddingLeft: 30,
                          borderTopLeftRadius: '20px',
                          borderTopRightRadius: '5px',
                          borderBottomRightRadius: '5px',
                          borderBottomLeftRadius: '20px',
                          backgroundColor: '#D9D9D94D',
                          border: '1px solid #3D3D3D1A'
                        }
                      }}
                    />
                    <Button
                      variant="subtle"
                      style={{
                        fontFamily: 'Barlow',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#6B7280',
                        backgroundColor: '#E5E7EB',
                        border: 'none',
                        minWidth: '75px',
                        height: '59px',
                        borderTopLeftRadius: '5',
                        borderTopRightRadius: '20px',
                        borderBottomRightRadius: '20px',
                        borderBottomLeftRadius: '5',
                      }}
                    >
                      <IconPlus size={16} />
                    </Button>
                  </Group>
                </Stack>
              </Paper>

              {/* What's NOT Included Column */}
              <Paper
                style={{
                  borderRadius: '20px',
                  gap: '30px',
                  paddingTop: '30px',
                  paddingRight: '20px',
                  paddingBottom: '30px',
                  paddingLeft: '20px',
                  borderTopWidth: '5px',
                  borderRightWidth: '1px',
                  borderBottomWidth: '1px',
                  borderLeftWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#CB462866'
                }}
              >
                <Stack gap={16}>
                  <Title
                    order={3}
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 700,
                      fontSize: '25px',
                      color: '#CB4628'
                    }}
                  >
                    This tour does NOT include
                  </Title>

                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 400,
                      fontSize: '20px',
                      color: '#6B7280'
                    }}
                  >
                    Clearly state what is not covered in their booking
                  </Text>

                  <Stack gap={12}>
                    {['Entry Tickets', 'Personal Expenses', 'Gratuities', 'Insurance'].map((item, index) => (
                      <Group key={index} justify="space-between" align="center" h={52} style={{
                        background: "#3D3D3D08",
                        borderRadius: 10
                      }}
                        px={5}
                        py={10}
                      >
                        <Text
                          style={{
                            fontFamily: 'Barlow',
                            fontWeight: 500,
                            fontSize: '19px',
                            color: '#9A031E'
                          }}
                        >
                          {item}
                        </Text>
                        <Box
                          style={{
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <IconX width={"100%"} height={"100%"} color="#6B7280" />
                        </Box>
                      </Group>
                    ))}
                  </Stack>

                  <Group gap={0} w={"100%"}>
                    <TextInput
                      placeholder="Add exclusion"
                      color='#3D3D3DB2'
                      flex={1}
                      styles={{
                        input: {
                          fontFamily: 'Barlow',
                          fontWeight: 700,
                          fontSize: '19px',
                          height: '59px',
                          paddingRight: 30,
                          paddingLeft: 30,
                          borderTopLeftRadius: '20px',
                          borderTopRightRadius: '5px',
                          borderBottomRightRadius: '5px',
                          borderBottomLeftRadius: '20px',
                          backgroundColor: '#D9D9D94D',
                          border: '1px solid #3D3D3D1A'
                        }
                      }}
                    />
                    <Button
                      variant="subtle"
                      style={{
                        fontFamily: 'Barlow',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#6B7280',
                        backgroundColor: '#E5E7EB',
                        border: 'none',
                        minWidth: '75px',
                        height: '59px',
                        borderTopLeftRadius: '5',
                        borderTopRightRadius: '20px',
                        borderBottomRightRadius: '20px',
                        borderBottomLeftRadius: '5',
                      }}
                    >
                      <IconPlus size={16} />
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            </SimpleGrid>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
