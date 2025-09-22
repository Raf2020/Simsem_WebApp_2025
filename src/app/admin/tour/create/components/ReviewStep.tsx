'use client';

import { useState } from 'react';
import {
  Text,
  Title,
  Button,
  Stack,
  Box,
  Group,
  Paper,
  Flex,
  Badge,
  Divider,
  Card,
  Image
} from '@mantine/core';
import { IconEye, IconCheck } from '@tabler/icons-react';

interface ReviewStepProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function ReviewStep({ onComplete, onBack }: ReviewStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - in real app this would come from form state
  const tourData = {
    title: "Hidden Gems of Dahshur Pyramids",
    categories: ["Adventure & Outdoor", "Cultural & Historical"],
    overview: "Discover the lesser-known pyramids of Dahshur in this exclusive adventure. Experience ancient Egyptian history away from the crowds while exploring the Red Pyramid and Bent Pyramid with expert local guidance.",
    duration: "Full day",
    maxParticipants: 8,
    price: 75,
    meetingPoint: "Hotel lobby in Cairo",
    inclusions: "Transportation, professional guide, entrance fees, traditional lunch",
    exclusions: "Personal expenses, tips, souvenirs",
    requirements: "Comfortable walking shoes, sun protection, moderate fitness level required",
    images: []
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onComplete();
  };

  return (
    <Box style={{ width: "100%" }}>
        <Stack gap="xl">
          <Title
            order={2}
            style={{
              fontFamily: 'Barlow',
              fontWeight: 600,
              fontSize: '24px',
              color: '#0D2E61',
              marginBottom: '8px'
            }}
          >
            Review Your Tour
          </Title>

          <Text
            style={{
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '16px'
            }}
          >
            Please review all the information before publishing your tour experience
          </Text>

          {/* Tour Preview Card */}
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              backgroundColor: '#f9fafb'
            }}
          >
            <Stack gap="md">
              {/* Title and Categories */}
              <Box>
                <Title
                  order={3}
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 600,
                    fontSize: '20px',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}
                >
                  {tourData.title}
                </Title>
                <Group gap={8}>
                  {tourData.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="filled"
                      size="sm"
                      style={{
                        backgroundColor: '#0f766e',
                        color: 'white',
                        fontFamily: 'Barlow'
                      }}
                    >
                      {category}
                    </Badge>
                  ))}
                </Group>
              </Box>

              <Divider />

              {/* Overview */}
              <Box>
                <Text
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#1f2937',
                    marginBottom: '4px'
                  }}
                >
                  Overview
                </Text>
                <Text
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.5'
                  }}
                >
                  {tourData.overview}
                </Text>
              </Box>

              <Divider />

              {/* Tour Details */}
              <Group grow>
                <Box>
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1f2937'
                    }}
                  >
                    Duration
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#6b7280'
                    }}
                  >
                    {tourData.duration}
                  </Text>
                </Box>
                <Box>
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1f2937'
                    }}
                  >
                    Max Participants
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#6b7280'
                    }}
                  >
                    {tourData.maxParticipants} people
                  </Text>
                </Box>
                <Box>
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1f2937'
                    }}
                  >
                    Price
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#6b7280'
                    }}
                  >
                    ${tourData.price} per person
                  </Text>
                </Box>
              </Group>

              <Divider />

              {/* Meeting Point */}
              <Box>
                <Text
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#1f2937',
                    marginBottom: '4px'
                  }}
                >
                  Meeting Point
                </Text>
                <Text
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#6b7280'
                  }}
                >
                  {tourData.meetingPoint}
                </Text>
              </Box>

              <Divider />

              {/* Inclusions & Exclusions */}
              <Group grow align="flex-start">
                <Box>
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}
                  >
                    What's Included
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#6b7280',
                      lineHeight: '1.4'
                    }}
                  >
                    {tourData.inclusions}
                  </Text>
                </Box>
                <Box>
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}
                  >
                    What's Not Included
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#6b7280',
                      lineHeight: '1.4'
                    }}
                  >
                    {tourData.exclusions}
                  </Text>
                </Box>
              </Group>

              <Divider />

              {/* Requirements */}
              <Box>
                <Text
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#1f2937',
                    marginBottom: '4px'
                  }}
                >
                  Requirements & Recommendations
                </Text>
                <Text
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.4'
                  }}
                >
                  {tourData.requirements}
                </Text>
              </Box>
            </Stack>
          </Card>
        </Stack>
    </Box>
  );
}
