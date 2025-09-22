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
  Paper,
  Flex,
  Select
} from '@mantine/core';
import { IconPlus, IconCalendar, IconWalk } from '@tabler/icons-react';

export default function TourItinerarySection() {
  return (
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
  );
}
