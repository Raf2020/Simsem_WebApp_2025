'use client';

import {
  Text,
  Title,
  Button,
  Stack,
  Group,
  TextInput,
  Textarea,
  Paper
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export default function TourThingsToKnowSection() {
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
                      placeholder={`• Opt for modest but breathable clothing as we'll be visiting religious sites.\n• Wear comfortable shoes\n\nPress 'Enter' to add a new detail`}
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
                          color: '#6B7280',
                          minHeight: 128
                        }
                      }}
                    />
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
  );
}
