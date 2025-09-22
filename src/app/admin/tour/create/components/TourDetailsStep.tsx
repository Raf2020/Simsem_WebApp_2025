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
  SimpleGrid,
  Select
} from '@mantine/core';
import { IconEye, IconUpload, IconX, IconPlus, IconCalendar, IconWalk } from '@tabler/icons-react';

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

        {/* Detailed Itinerary Section */}
        <Paper
          shadow="xl"
          radius="lg"
          px={{ base: 10, sm: 30 }}
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
          <Stack gap={30} w="100%" py={40}>
            {/* Title */}
            <Stack gap={10}>
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
                Detailed Itinerary
              </Title>
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 400,
                  fontSize: '20px',
                  color: '#6B7280'
                }}
              >
                Create a day-by-day breakdown with specific times and activities.
              </Text>
            </Stack>

            {/* Tour Duration Controls */}
            <Flex gap={50} w={"100%"} align={"center"}>
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 500,
                  fontSize: '20px',
                  color: '#374151'
                }}

              >
                Tour Duration
              </Text>
              <Group gap={10}>
                <TextInput
                  type="number"
                  h={59}
                  styles={{
                    input: {
                      height: 59,
                      width: 193,
                      textAlign: 'left',
                      fontFamily: 'Barlow',
                      fontWeight: 500,
                      fontSize: '18px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px'
                    }
                  }}
                />
                <Select
                  defaultValue="Day"
                  data={['Day', 'Days', 'Hour', 'Hours']}
                  styles={{
                    input: {
                      height: 59,
                      width: 193,
                      fontFamily: 'Barlow',
                      fontWeight: 400,
                      fontSize: '14px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px'
                    }
                  }}
                />
              </Group>
            </Flex>

            {/* Day 1 */}

            <Paper
              px={41}
              py={20}
              radius="lg"
              style={{
                backgroundColor: '#0D2E610D',
                border: '1px solid #0D2E6199'
              }}
            >
              <Stack gap={20}>
                {/* Day 1 Header */}
                <Group gap={10}>
                  <Box
                    style={{
                      width: '23px',
                      height: '23px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconCalendar color='#0D2E61' width={"100%"} height={"100%"} />
                  </Box>
                  <Title
                    order={4}
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 600,
                      fontSize: '23px',
                      color: '#0D2E61'
                    }}
                  >
                    Day 1
                  </Title>
                </Group>

                <Paper
                  p={20}
                  radius="lg"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <Stack gap={20} px={30} >
                    {/* Dahshur Activity Header */}
                    <Group align="center" pb={15} style={{
                      borderBottom: "1px solid #3D3D3D1A"
                    }}>
                      <Group gap={10}>
                        <IconWalk
                          size={20}
                          color="#0D2E61"
                          style={{
                            flexShrink: 0
                          }}
                        />
                        <Title
                          order={4}
                          style={{
                            fontFamily: 'Barlow',
                            fontWeight: 600,
                            fontSize: '20px',
                            color: '#0D2E61'
                          }}
                        >
                          Dahshur
                        </Title>
                      </Group>
                      <Box
                        style={{
                          backgroundColor: '#F3F4F6',
                          borderRadius: '12px',
                          padding: '6px 12px'
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: 'Barlow',
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#374151'
                          }}
                        >
                          8:00AM
                        </Text>
                      </Box>
                    </Group>

                    {/* Activity Details Grid */}
                    <Flex gap={20}>
                      <Stack gap={8} style={{ gridColumn: 'span 187px' }}>
                        <Text
                          style={{
                            fontFamily: 'Barlow',
                            fontWeight: 500,
                            fontSize: '16px',
                            color: '#6B7280'
                          }}
                        >
                          Time
                        </Text>
                        <TextInput

                          styles={{
                            input: {
                              border: "1px solid #3D3D3D14",
                              fontFamily: 'Barlow',
                              height: "54px",
                              fontWeight: 400,
                              borderRadius: "10px",
                              fontSize: '16px',
                              color: '#3D3D3DB2'
                            }
                          }}
                        />

                      </Stack>
                      <Box style={{ gridColumn: 'span auto' }}>
                        <Stack gap={8}>
                          <Text
                            style={{
                              fontFamily: 'Barlow',
                              fontWeight: 500,
                              fontSize: '16px',
                              color: '#6B7280'
                            }}
                          >
                            Activity / Location
                          </Text>
                          <TextInput

                            styles={{
                              input: {
                                border: "1px solid #3D3D3D14",
                                fontFamily: 'Barlow',
                                height: "54px",
                                fontWeight: 400,
                                borderRadius: "10px",
                                fontSize: '16px',
                                color: '#3D3D3DB2'
                              }
                            }}
                          />
                          <Stack gap={12}>
                            <Text
                              style={{
                                fontFamily: 'Barlow',
                                fontWeight: 500,
                                fontSize: '16px',
                                color: '#6B7280'
                              }}
                            >
                              Description
                            </Text>
                            <Textarea
                              defaultValue="Before leaving we will head to hidden spot in Dahshur where we can enjoy watching 3 of Dahshur Pyramids (Bent Pyramid - Red Pyramid - Black Pyramid)"
                              minRows={4}
                              styles={{
                                input: {
                                  fontFamily: 'Barlow',
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  backgroundColor: 'white',
                                  border: '1px solid #E5E7EB',
                                  borderRadius: '8px',
                                  padding: '12px 16px',
                                  color: '#374151'
                                }
                              }}
                            />
                            <Text
                              style={{
                                fontFamily: 'Barlow',
                                fontWeight: 400,
                                fontSize: '14px',
                                color: '#9CA3AF',
                                fontStyle: 'italic'
                              }}
                            >
                              Example: &quot;8:00 AM - Petra: We will enter through the Siq and explore the Treasury, sharing stories about Nabataean culture and architecture.&quot;
                            </Text>
                          </Stack>
                        </Stack>
                      </Box>

                    </Flex>


                  </Stack>
                </Paper>

                {/* Add Itinerary Item Button */}
                <Button
                  leftSection={<IconPlus size={16} />}
                  style={{
                    width: '191px',
                    height: '50px',
                    borderRadius: '10px',
                    gap: '6px',
                    paddingTop: '15px',
                    paddingRight: '20px',
                    paddingBottom: '15px',
                    paddingLeft: '20px',
                    backgroundColor: '#0D2E61',
                    border: 'none',
                    fontFamily: 'Barlow',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: 'white'
                  }}
                >
                  Add itinerary item
                </Button>
              </Stack>
            </Paper>

          </Stack>
        </Paper>
        <Paper
          shadow="xl"
          radius="lg"
          px={{ base: 10, sm: 30 }}
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
          <Stack gap={30} w="100%" py={40}>
            {/* Title */}
            <Stack gap={10}>
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
                Things to know
              </Title>
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 400,
                  fontSize: '20px',
                  color: '#6B7280'
                }}
              >
                Add important information, reminders, and guidelines for travelers
              </Text>

            </Stack>



            <Paper
              px={41}
              py={20}
              radius="lg"
              style={{
                backgroundColor: '#0D2E610D',
                border: '1px solid #0D2E6199'
              }}
            >
              <Stack gap={20}>
                {/* Day 1 Header */}
                <Paper
                  p={20}
                  radius="lg"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <Stack gap={20} px={30} >
                    {/* Dahshur Activity Header */}
                    <Group align="center" pb={15} style={{
                      borderBottom: "1px solid #3D3D3D1A"
                    }}>

                      <Title
                        order={4}
                        style={{
                          fontFamily: 'Barlow',
                          fontWeight: 600,
                          fontSize: '20px',
                          color: '#0D2E61'
                        }}
                      >
                        Dress Code
                      </Title>
                    </Group>

                    {/* Activity Details Grid */}
                    <Stack gap={20}>
                      {/* Guideline Section */}
                      <Stack gap={12}>
                        <Text
                          style={{
                            fontFamily: 'Barlow',
                            fontWeight: 500,
                            fontSize: '18px',
                            color: '#6B7280'
                          }}
                        >
                          Guideline
                        </Text>
                        <TextInput
                          placeholder="Dress Code"
                          styles={{
                            input: {
                              height: "54px",
                              fontFamily: 'Barlow',
                              fontWeight: 400,
                              fontSize: '18px',
                              backgroundColor: 'white',
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                              padding: '12px 16px',
                              color: '#9CA3AF'
                            }
                          }}
                        />
                      </Stack>

                      {/* Details Section */}
                      <Stack gap={12}>
                        <Text
                          style={{
                            fontFamily: 'Barlow',
                            fontWeight: 500,
                            fontSize: '18px',
                            color: '#6B7280'
                          }}
                        >
                          Details
                        </Text>

                        {/* Details Textarea */}
                        <Textarea
                          placeholder={`• Opt for modest but breathable clothing as we'll be visiting religious sites.\n• Wear comfortable shoes`}
                          minRows={4}
                          styles={{
                            input: {
                              fontFamily: 'Barlow',
                              fontWeight: 400,
                              fontSize: '18px',
                              backgroundColor: 'white',
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                              padding: '12px 16px',
                              color: '#6B7280',
                              minHeight: 128
                            }
                          }}
                        />
                        <Text
                          style={{
                            fontStyle: "italic",
                            fontFamily: 'Barlow',
                            fontWeight: 500,
                            fontSize: '13px',
                            color: '#3D3D3DB2'
                          }}

                        >Press &apos;Enter&apos; to add a new detail</Text>
                      </Stack>
                    </Stack>


                  </Stack>
                </Paper>
                {/* Add Guideline Button */}
                <Button
                  leftSection={<IconPlus size={16} />}
                  style={{
                    width: '191px',
                    height: '50px',
                    borderRadius: '10px',
                    gap: '6px',
                    paddingTop: '15px',
                    paddingRight: '20px',
                    paddingBottom: '15px',
                    paddingLeft: '20px',
                    backgroundColor: '#0D2E61',
                    border: 'none',
                    fontFamily: 'Barlow',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: 'white'
                  }}
                >
                  Add guideline
                </Button>
              </Stack>

            </Paper>

          </Stack>
        </Paper>
        <Paper
          shadow="xl"
          radius="lg"
          px={{ base: 10, sm: 30 }}
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
          <Stack gap={30} w="100%" py={40}>
            {/* Title */}
            <Stack gap={10}>
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
                Pickup Point
              </Title>
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 400,
                  fontSize: '20px',
                  color: '#6B7280'
                }}
              >
                Add a pickup point
              </Text>

            </Stack>



            <Paper
              px={41}
              py={20}
              radius="lg"
              style={{
                backgroundColor: '#0D2E610D',
                border: '1px solid #0D2E6199'
              }}
            >
              <Stack gap={20}>
                {/* Day 1 Header */}
                <Paper
                  p={20}
                  radius="lg"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <Stack gap={20}>
                    {/* Checkbox Header */}
                    <Group gap={12} align="center">
                      <Box
                        style={{
                          width: '20px',
                          height: '20px',
                          backgroundColor: '#0D2E61',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <Text
                          style={{
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          ✓
                        </Text>
                      </Box>
                      <Title
                        order={4}
                        style={{
                          fontFamily: 'Barlow',
                          fontWeight: 600,
                          fontSize: '20px',
                          color: '#0D2E61'
                        }}
                      >
                        Pickup from any airport
                      </Title>
                    </Group>

                    {/* Address Section */}
                    <Stack gap={8}>
                      <Text
                        style={{
                          fontFamily: 'Barlow',
                          fontWeight: 700,
                          fontSize: '18px',
                          color: '#3D3D3DB2'
                        }}
                      >
                        Address
                      </Text>
                      <TextInput
                        placeholder="Egypt Airport, Egypt"
                        styles={{
                          input: {
                            fontFamily: 'Barlow',
                            fontWeight: 400,
                            height: 54,
                            fontSize: '18px',
                            backgroundColor: '#F9FAFB',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            color: '#3D3D3DB2'
                          }
                        }}
                      />
                    </Stack>

                    {/* Map Section */}
                    <Box
                      style={{
                        width: '100%',
                        height: '220px',
                        borderRadius: '12px',
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        overflow: 'hidden',
                        backgroundColor: '#F3F4F6',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23E5E7EB' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {/* Map Placeholder */}
                      <Stack align="center" gap={8}>
                        <Box
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#EF4444',
                            borderRadius: '50% 50% 50% 0',
                            transform: 'rotate(-45deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                          }}
                        >
                          <Box
                            style={{
                              width: '16px',
                              height: '16px',
                              backgroundColor: 'white',
                              borderRadius: '50%',
                              transform: 'rotate(45deg)'
                            }}
                          />
                        </Box>
                        <Text
                          style={{
                            fontFamily: 'Barlow',
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#6B7280',
                            textAlign: 'center'
                          }}
                        >
                          Map will be displayed here
                        </Text>
                      </Stack>
                    </Box>
                  </Stack>


                </Paper>
                {/* Add Guideline Button */}
                <Button
                  leftSection={<IconPlus size={16} />}
                  style={{
                    width: '191px',
                    height: '50px',
                    borderRadius: '10px',
                    gap: '6px',
                    paddingTop: '15px',
                    paddingRight: '20px',
                    paddingBottom: '15px',
                    paddingLeft: '20px',
                    backgroundColor: '#0D2E61',
                    border: 'none',
                    fontFamily: 'Barlow',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: 'white'
                  }}
                >
                  Add pickup point
                </Button>
              </Stack>

            </Paper>

          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
