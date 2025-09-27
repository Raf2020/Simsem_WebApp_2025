'use client';

import {
  Text,
  Title,
  Button,
  Stack,
  Box,
  Group,
  Badge,
  Paper,
  Flex,
  Modal,
  TextInput,
  Select
} from '@mantine/core';
import { IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useLanguage, PROFICIENCY_LEVELS, type ProficiencyLevel } from '../contexts/LanguageContext';

interface LanguageStepProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function LanguageStep({ onComplete, onBack }: LanguageStepProps) {
  const { form, languages, removeLanguage, addLanguage, canAddMore, isFormValid } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLanguageName, setNewLanguageName] = useState('');
  const [newLanguageProficiency, setNewLanguageProficiency] = useState<ProficiencyLevel>('CONVERSATIONAL');

  const formErrors = form.formState.errors;

  // Handle adding a new language
  const handleAddLanguage = () => {
    if (newLanguageName.trim()) {
      addLanguage({
        name: newLanguageName.trim(),
        proficiency: newLanguageProficiency
      });

      // Reset form and close modal
      setNewLanguageName('');
      setNewLanguageProficiency('CONVERSATIONAL');
      setIsAddModalOpen(false);
    }
  };

  // Proficiency options for the select
  const proficiencyOptions = Object.entries(PROFICIENCY_LEVELS).map(([key, value]) => ({
    value: key,
    label: value
  }));

  return (

    <Stack gap="lg" style={{
      maxWidth: 962,
      width: "100%"
    }}>

      {/* maxWidth: '962px',  */}
      <Paper
        withBorder
        radius="lg"
        p={{ base: "sm", sm: "xl" }}
        py={"xl"}
        style={{
          width: '100%',
          margin: '0 auto'
        }}
      >
        <Stack gap={"lg"}>
          <Stack gap={5}>
            <Title
              order={2}
              style={{
                fontFamily: 'Barlow',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#0D2E61',
                marginBottom: '8px'
              }}
            >
              Languages
            </Title>
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#6b7280'
              }}
            >
              You can add up to three languages
            </Text>
          </Stack>
          <Group gap={12}>
            {languages.map((language, index) => (
              <Box key={index} style={{ position: 'relative' }}>
                <Button
                  variant="light"
                  rightSection={
                    <Badge
                      size="xl"
                      style={{
                        backgroundColor: language.badgeColor || '#0D2E610D',
                        color: language.badgeTextColor || '#0D2E61',
                        marginLeft: '10px',
                        fontFamily: 'Barlow',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        textAlign: 'justify',
                        height: '23px',
                        padding: '3px 5px',
                        borderRadius: '10px',
                        border: '1px solid #3D3D3D1A'
                      }}
                    >
                      {language.proficiency}
                    </Badge>
                  }
                  style={{
                    backgroundColor: '#e5e7eb',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '10px',
                    fontFamily: 'Barlow',
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'justify',
                    height: '51px',
                    padding: '',
                    gap: '10px'
                  }}
                >
                  {language.name}
                </Button>

                {/* Remove button */}
                <Button
                  size="xs"
                  variant="filled"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLanguage(index);
                  }}
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 24,
                    height: 24,
                    minWidth: 24,
                    padding: 0,
                    borderRadius: '50%',
                    backgroundColor: '#ef4444',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease',
                    zIndex: 10
                  }}
                  
                >
                  <IconTrash size={12} color="white" />
                </Button>
              </Box>
            ))}
          </Group>

          <Box>
            <Button
              variant="outline"
              leftSection={<IconPlus size={14} />}
              onClick={() => setIsAddModalOpen(true)}
              disabled={!canAddMore}
              style={{
                fontFamily: 'Barlow',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: canAddMore ? '#6b7280' : '#9ca3af',
                borderColor: canAddMore ? '#d1d5db' : '#e5e7eb',
                backgroundColor: 'transparent',
                height: '52px',
                padding: '15px 20px',
                borderRadius: '10px',
                borderWidth: '1px',
                gap: '10px',
                cursor: canAddMore ? 'pointer' : 'not-allowed'
              }}
            >
              Add Language
            </Button>
          </Box>

          {/* Error message for languages */}
          {formErrors.languages && (
            <Text size="sm" c="red" mt={4}>
              {formErrors.languages.message as string}
            </Text>
          )}
        </Stack>
      </Paper>
      {/* Buttons */}
      <Flex
        justify="space-between"
        gap={12}
        direction={{ base: "column", sm: "row" }}
      >
        <Button
          variant="filled"
          size="md"
          onClick={onBack}
          w={{ base: '100%', sm: 'auto' }}
          style={{
            backgroundColor: '#d1d5db',
            color: '#6b7280',
            border: 'none',
            borderRadius: '6px',
            height: '44px',
            fontSize: '14px',
            fontWeight: 500,
            minWidth: '120px'
          }}
        >
          Back
        </Button>

        <Button
          size="md"
          onClick={() => {
            form.trigger()
            if (isFormValid) {
              onComplete();
            }
          }}
          w={{ base: '100%', sm: 'auto' }}
          style={{
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            height: '44px',
            fontSize: '14px',
            fontWeight: 500,
            minWidth: '120px',
          }}
        >
          Proceed
        </Button>
      </Flex>

      {/* Add Language Modal */}
      <Modal
        opened={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Language"
        centered
        styles={{
          title: {
            fontFamily: 'Barlow',
            fontWeight: 700,
            fontSize: '18px',
            color: '#0D2E61'
          }
        }}
      >
        <Stack gap="md">
          <TextInput
            label="Language Name"
            placeholder="e.g., Spanish, German, Japanese"
            value={newLanguageName}
            onChange={(e) => setNewLanguageName(e.target.value)}
            styles={{
              label: {
                fontFamily: 'Barlow',
                fontWeight: 500,
                fontSize: '14px',
                color: '#374151',
                marginBottom: '8px'
              }
            }}
          />

          <Select
            label="Proficiency Level"
            value={newLanguageProficiency}
            onChange={(value) => setNewLanguageProficiency(value as ProficiencyLevel)}
            data={proficiencyOptions}
            styles={{
              label: {
                fontFamily: 'Barlow',
                fontWeight: 500,
                fontSize: '14px',
                color: '#374151',
                marginBottom: '8px'
              }
            }}
          />

          <Group justify="flex-end" gap="sm" mt="md">
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
              style={{
                borderColor: '#d1d5db',
                color: '#6b7280'
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddLanguage}
              disabled={!newLanguageName.trim()}
              style={{
                backgroundColor: newLanguageName.trim() ? '#f59e0b' : '#d1d5db',
                color: newLanguageName.trim() ? 'white' : '#6b7280'
              }}
            >
              Add Language
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>

  );
}
