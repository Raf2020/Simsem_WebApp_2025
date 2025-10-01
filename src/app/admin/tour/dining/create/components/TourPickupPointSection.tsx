'use client';

import {
  Text,
  Title,
  Stack,
  Box,
  Group,
  TextInput
} from '@mantine/core';
import { useTourDetails } from '../contexts/TourDetailsContext';
import { ResponsivePaper } from '@/components/ui';

export default function TourPickupPointSection() {
  const {
    form
  } = useTourDetails();
  const { watch, setValue, formState: { errors } } = form;
  const pickupPoints = watch('pickupPoints');
  return (
    <ResponsivePaper
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
            Meeting Point
          </Title>
          <Text
            style={{
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '20px',
              color: '#6B7280'
            }}
          >
            Set the meeting point for your dining experience
          </Text>

        </Stack>



        <ResponsivePaper
          variant="section"
          py={20}
          radius="lg"
          style={{
            backgroundColor: '#0D2E610D',
            border: '1px solid #0D2E6199'
          }}
        >
          <Stack gap={20}>
            {/* Single Meeting Point */}
            <ResponsivePaper
              variant="default"
              radius="lg"
            >
                <Stack gap={20}>
                  {/* Meeting Point Header */}
                  <Group gap={12} align="center">
                    <Box
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: (pickupPoints?.[0]?.address && pickupPoints?.[0]?.address.trim() !== '') ? '#0D2E61' : 'transparent',
                        border: (pickupPoints?.[0]?.address && pickupPoints?.[0]?.address.trim() !== '') ? 'none' : '2px solid #D1D5DB',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'default'
                      }}
                    >
                      {(pickupPoints?.[0]?.address && pickupPoints?.[0]?.address.trim() !== '') && (
                        <Text
                          style={{
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          ✓
                        </Text>
                      )}
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
                      {pickupPoints?.[0]?.name || 'Meeting Point'}
                    </Title>
                  </Group>

                {/* Meeting Point Name Section */}
                <Stack gap={8}>
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#6B7280'
                    }}
                  >
                    Meeting Point Name
                  </Text>
                  <TextInput
                    placeholder="e.g., Restaurant Entrance, Café Main Door"
                    value={pickupPoints?.[0]?.name || ''}
                    onChange={(e) => {
                      setValue(`pickupPoints.0.name`, e.target.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    error={errors?.pickupPoints?.[0]?.name?.message}
                    styles={{
                      input: {
                        fontFamily: 'Barlow',
                        fontWeight: 400,
                        height: 54,
                        fontSize: '16px',
                        backgroundColor: '#F9FAFB',
                        border: errors?.pickupPoints?.[0]?.name
                          ? '1px solid #dc2626'
                          : '1px solid #E5E7EB',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: '#374151'
                      }
                    }}
                  />
                </Stack>

                {/* Address Section */}
                <Stack gap={8}>
                  <Text
                    style={{
                      fontFamily: 'Barlow',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#6B7280'
                    }}
                  >
                    Address
                  </Text>
                  <TextInput
                    placeholder="Enter meeting point address"
                    value={pickupPoints?.[0]?.address || ''}
                    onChange={(e) => {
                      setValue(`pickupPoints.0.address`, e.target.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    error={errors?.pickupPoints?.[0]?.address?.message}
                    styles={{
                      input: {
                        fontFamily: 'Barlow',
                        fontWeight: 400,
                        height: 54,
                        fontSize: '16px',
                        backgroundColor: '#F9FAFB',
                        border: errors?.pickupPoints?.[0]?.address
                          ? '1px solid #dc2626'
                          : '1px solid #E5E7EB',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: '#374151'
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
              </ResponsivePaper>
          </Stack>

        </ResponsivePaper>

      </Stack>
    </ResponsivePaper>
  );
}
