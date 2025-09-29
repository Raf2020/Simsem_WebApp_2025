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
import { useTourDetails } from '../contexts/TourDetailsContext';

export default function TourThingsToKnowSection() {
  const {
    form,
    guidelinesArray
  } = useTourDetails();
  const { watch, setValue, formState: { errors } } = form;
  const guidelines = watch('guidelines');

  // Handle bullet formatting for textarea
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, fieldIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const cursorPosition = textarea.selectionStart;
      const currentValue = textarea.value;

      // Add new line with bullet
      const newValue = currentValue.slice(0, cursorPosition) + '\n• ' + currentValue.slice(cursorPosition);

      setValue(`guidelines.${fieldIndex}.details`, newValue, {
        shouldValidate: true,
        shouldDirty: true,
      });

      // Set cursor position after the bullet
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 3;
      }, 0);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, fieldIndex: number) => {
    let value = e.target.value;

    // Ensure first line starts with bullet if not empty
    if (value && !value.startsWith('• ')) {
      value = '• ' + value;
    }

    setValue(`guidelines.${fieldIndex}.details`, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
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
            {/* Dynamic Guidelines */}
            {guidelinesArray.fields.map((field: any, index: number) => (
              <Paper
                key={field.id}
                p={20}
                radius="lg"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB'
                }}
              >
                <Stack gap={20} px={30} >
                  {/* Guideline Header */}
                  <Group align="center" pb={15} justify="space-between" style={{
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
                      {guidelines?.[index]?.title || 'Guideline'}
                    </Title>
                    {guidelinesArray.fields.length > 1 && (
                      <Button
                        variant="subtle"
                        color="red"
                        size="sm"
                        onClick={() => guidelinesArray.remove(index)}
                      >
                        ×
                      </Button>
                    )}
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
                        placeholder="e.g., Dress Code, What to Bring, etc."
                        value={guidelines?.[index]?.title || ''}
                        onChange={(e) => setValue(`guidelines.${index}.title`, e.target.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })}
                        error={errors?.guidelines?.[index]?.title?.message}
                        styles={{
                          input: {
                            height: "54px",
                            fontFamily: 'Barlow',
                            fontWeight: 400,
                            fontSize: '18px',
                            backgroundColor: 'white',
                            border: errors?.guidelines?.[index]?.title
                              ? '1px solid #dc2626'
                              : '1px solid #E5E7EB',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            color: '#374151'
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
                        placeholder={`• Start typing your details here\n• Press 'Enter' to add new bullet points`}
                        value={guidelines?.[index]?.details || ''}
                        onChange={(e) => handleTextareaChange(e, index)}
                        onKeyDown={(e) => handleTextareaKeyDown(e, index)}
                        error={errors?.guidelines?.[index]?.details?.message}
                        minRows={4}
                        styles={{
                          input: {
                            fontFamily: 'Barlow',
                            fontWeight: 400,
                            fontSize: '16px',
                            backgroundColor: 'white',
                            border: errors?.guidelines?.[index]?.details
                              ? '1px solid #dc2626'
                              : '1px solid #E5E7EB',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            color: '#374151',
                            minHeight: 128
                          }
                        }}
                      />
                    </Stack>
                  </Stack>


                </Stack>
              </Paper>
            ))}

            {/* Add Guideline Button */}
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={() => guidelinesArray.append({ title: '', details: '• ' })}
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
