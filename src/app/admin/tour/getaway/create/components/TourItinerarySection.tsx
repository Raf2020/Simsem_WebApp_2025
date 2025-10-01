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
import { IconPlus, IconCalendar } from '@tabler/icons-react';
import { useTourDetails } from '../contexts/TourDetailsContext';
import { ResponsivePaper, ResponsiveStack, ResponsiveFlex, ResponsiveBox, ActivityHeader } from '@/components/ui';

export default function TourItinerarySection() {
  const {
    form,
    addItineraryItem,
    removeItineraryItem,
    getItineraryDay,
    initializeDay
  } = useTourDetails();
  const { watch, setValue, formState: { errors } } = form;

  // Watch tour duration to generate day cards
  const tourDuration = watch('tourDuration');

  // Get number of cards and label based on duration
  const numberOfCards = tourDuration?.value || 1;
  const getCardLabel = (index: number) => {
    const unit = tourDuration?.unit || 'Day';
    const cardNumber = index + 1;

    if (unit === 'Day') {
      return `Day ${cardNumber}`;
    } else if (unit === 'Week') {
      return `Week ${cardNumber}`;
    }
    return `Day ${cardNumber}`;
  };
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
              min={1}
              max={30}
              value={tourDuration?.value || ''}
              onChange={(e) => setValue('tourDuration.value', parseInt(e.target.value) || 1, {
                shouldValidate: true,
                shouldDirty: true,
              })}
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
              value={tourDuration?.unit || 'Day'}
              onChange={(value) => setValue('tourDuration.unit', value as 'Day' | 'Week', {
                shouldValidate: true,
                shouldDirty: true,
              })}
              data={['Day', 'Week']}
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

        {/* Dynamic Cards */}
        {Array.from({ length: numberOfCards }, (_, dayIndex) => (
          <ResponsivePaper
            key={dayIndex}
            variant="section"
            py={20}
            radius="lg"
            style={{
              backgroundColor: '#0D2E610D',
              border: '1px solid #0D2E6199'
            }}
          >
            <Stack gap={20}>
              {/* Day Header */}
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
                  {getCardLabel(dayIndex)}
                </Title>
              </Group>

              {/* Show all itinerary items for this day */}
              {(() => {
                const dayNumber = dayIndex + 1;
                initializeDay(dayNumber);
                const dayItems = getItineraryDay(dayNumber);

                return dayItems.map((item: any, itemIndex: number) => (
                  <ResponsivePaper
                    key={itemIndex}
                    variant="card"
                    radius="lg"
                  >
                    <ResponsiveStack variant="inner">
                      {/* Itinerary Activity Header */}
                      <ActivityHeader
                        title={item.activity || 'Itinerary'}
                        time={item.time}
                        onRemove={(() => {
                          const dayNumber = dayIndex + 1;
                          const dayItems = getItineraryDay(dayNumber);
                          return dayItems.length > 1
                            ? () => removeItineraryItem(dayNumber, itemIndex)
                            : undefined;
                        })()}
                      />

                      {/* Activity Details Grid */}
                      <ResponsiveFlex variant="form">
                        <ResponsiveBox variant="form-field">
                          <Stack gap={8}>
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
                            type='time'
                            value={item.time || ''}
                            onChange={(e) => {
                              setValue(`itinerary.day${dayNumber}.${itemIndex}.time`, e.target.value, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            }}
                            error={errors?.itinerary?.[`day${dayNumber}`]?.[itemIndex]?.time?.message}
                            styles={{
                              input: {
                                border: errors?.itinerary?.[`day${dayNumber}`]?.[itemIndex]?.time
                                  ? "1px solid #dc2626"
                                  : "1px solid #3D3D3D14",
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
                        </ResponsiveBox>
                        <ResponsiveBox variant="full-mobile">
                          <Stack gap={20}>
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
                              placeholder="Activity/Location"
                              value={item.activity || ''}
                              onChange={(e) => {
                                setValue(`itinerary.day${dayNumber}.${itemIndex}.activity`, e.target.value, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                });
                              }}
                              error={errors?.itinerary?.[`day${dayNumber}`]?.[itemIndex]?.activity?.message}
                              styles={{
                                input: {
                                  border: errors?.itinerary?.[`day${dayNumber}`]?.[itemIndex]?.activity
                                    ? "1px solid #dc2626"
                                    : "1px solid #3D3D3D14",
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
                                placeholder="Describe the activity details..."
                                value={item.description || ''}
                                onChange={(e) => {
                                  setValue(`itinerary.day${dayNumber}.${itemIndex}.description`, e.target.value, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                  });
                                }}
                                error={errors?.itinerary?.[`day${dayNumber}`]?.[itemIndex]?.description?.message}
                                minRows={4}
                                styles={{
                                  input: {
                                    fontFamily: 'Barlow',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    backgroundColor: 'white',
                                    border: errors?.itinerary?.[`day${dayNumber}`]?.[itemIndex]?.description
                                      ? '1px solid #dc2626'
                                      : '1px solid #E5E7EB',
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
                          </Stack>
                        </ResponsiveBox>

                      </ResponsiveFlex>


                    </ResponsiveStack>
                  </ResponsivePaper>
                ));
              })()}

              {/* Add Itinerary Item Button */}
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={() => addItineraryItem(dayIndex + 1)}
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
          </ResponsivePaper>
        ))}

      </Stack>
    </Paper>
  );
}
