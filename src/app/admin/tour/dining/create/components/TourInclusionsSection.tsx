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
  Paper,
  SimpleGrid
} from '@mantine/core';
import { IconX, IconPlus } from '@tabler/icons-react';
import { useTourDetails } from '../contexts/TourDetailsContext';

export default function TourInclusionsSection() {
  const { form } = useTourDetails();
  const { formState: { errors }, watch, setValue, getValues } = form;

  // Watch current values
  const inclusions = watch('inclusions') || [];
  const exclusions = watch('exclusions') || [];

  // Local state for input fields
  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');

  // Helper functions
  const addInclusion = () => {
    if (newInclusion.trim()) {
      const currentInclusions = getValues('inclusions') || [];
      setValue('inclusions', [...currentInclusions, newInclusion.trim()], {
        shouldValidate: true,
        shouldDirty: true,
      });
      setNewInclusion('');
    }
  };

  const addExclusion = () => {
    if (newExclusion.trim()) {
      const currentExclusions = getValues('exclusions') || [];
      setValue('exclusions', [...currentExclusions, newExclusion.trim()], {
        shouldValidate: true,
        shouldDirty: true,
      });
      setNewExclusion('');
    }
  };

  const removeInclusion = (index: number) => {
    const currentInclusions = getValues('inclusions') || [];
    const updatedInclusions = currentInclusions.filter((_, i) => i !== index);
    setValue('inclusions', updatedInclusions, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeExclusion = (index: number) => {
    const currentExclusions = getValues('exclusions') || [];
    const updatedExclusions = currentExclusions.filter((_, i) => i !== index);
    setValue('exclusions', updatedExclusions, {
      shouldValidate: true,
      shouldDirty: true,
    });
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
                {inclusions.map((item: string, index: number) => (
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
                      onClick={() => removeInclusion(index)}
                    >
                      <IconX width={"100%"} height={"100%"} color="#6B7280" />
                    </Box>
                  </Group>
                ))}
              </Stack>

              <Group gap={0} w={"100%"}>
                <TextInput
                  placeholder="Add inclusion"
                  value={newInclusion}
                  onChange={(event) => setNewInclusion(event.currentTarget.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      addInclusion();
                    }
                  }}
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
                  onClick={addInclusion}
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

              {errors.inclusions && (
                <Text
                  style={{
                    color: '#ef4444',
                    fontSize: '14px',
                    fontFamily: 'Barlow',
                    marginTop: '8px'
                  }}
                >
                  {errors.inclusions.message}
                </Text>
              )}
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
                {exclusions.map((item: string, index: number) => (
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
                      onClick={() => removeExclusion(index)}
                    >
                      <IconX width={"100%"} height={"100%"} color="#6B7280" />
                    </Box>
                  </Group>
                ))}
              </Stack>

              <Group gap={0} w={"100%"}>
                <TextInput
                  placeholder="Add exclusion"
                  value={newExclusion}
                  onChange={(event) => setNewExclusion(event.currentTarget.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      addExclusion();
                    }
                  }}
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
                  onClick={addExclusion}
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

              {errors.exclusions && (
                <Text
                  style={{
                    color: '#ef4444',
                    fontSize: '14px',
                    fontFamily: 'Barlow',
                    marginTop: '8px'
                  }}
                >
                  {errors.exclusions.message}
                </Text>
              )}
            </Stack>
          </Paper>
        </SimpleGrid>
      </Stack>
    </Paper>
  );
}
