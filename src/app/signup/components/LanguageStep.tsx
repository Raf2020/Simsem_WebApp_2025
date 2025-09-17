'use client';

import { useState } from 'react';
import {
  Text,
  Title,
  Button,
  Stack,
  Box,
  Group,
  Badge,
  Paper
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

interface LanguageStepProps {
  onComplete: () => void;
  onBack: () => void;
}

interface Language {
  name: string;
  level: 'NATIVE' | 'FLUENT' | 'CONVERSATIONAL' | 'BASIC';
}

const availableLanguages = [
  'Arabic', 'English', 'French', 'Spanish', 'German', 'Italian', 
  'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Hindi',
  'Turkish', 'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish'
];

const levelColors = {
  NATIVE: 'blue',
  FLUENT: 'green', 
  CONVERSATIONAL: 'orange',
  BASIC: 'gray'
};

export default function LanguageStep({ onComplete, onBack }: LanguageStepProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([
    { name: 'Arabic', level: 'NATIVE' },
    { name: 'English', level: 'FLUENT' },
    { name: 'French', level: 'CONVERSATIONAL' }
  ]);
  const [showAddLanguage, setShowAddLanguage] = useState(false);

  const addLanguage = (languageName: string, level: Language['level']) => {
    if (selectedLanguages.length < 3 && !selectedLanguages.find(l => l.name === languageName)) {
      setSelectedLanguages([...selectedLanguages, { name: languageName, level }]);
      setShowAddLanguage(false);
    }
  };

  const removeLanguage = (languageName: string) => {
    setSelectedLanguages(selectedLanguages.filter(l => l.name !== languageName));
  };

  const updateLanguageLevel = (languageName: string, newLevel: Language['level']) => {
    setSelectedLanguages(selectedLanguages.map(l => 
      l.name === languageName ? { ...l, level: newLevel } : l
    ));
  };

  return (
    <Paper
      p={40}
      radius="md"
      style={{
        maxWidth: '962px',
        width: '100%',
        margin: '0 auto',
        border: '1px solid #e5e7eb'
      }}
    >
      <Stack gap={24}>
        <Box>
          <Title 
            order={2} 
            style={{
              fontFamily: 'Barlow',
              fontWeight: 600,
              fontSize: '24px',
              color: '#000000',
              marginBottom: '8px'
            }}
          >
            Languages
          </Title>
          <Text 
            style={{
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '16px',
              color: '#6b7280'
            }}
          >
            You can add up to three languages
          </Text>
        </Box>

        <Stack gap={16}>
          {selectedLanguages.map((language) => (
            <Group key={language.name} justify="space-between" align="center">
              <Group gap={12}>
                <Text 
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 400,
                    fontSize: '18px',
                    color: '#000000'
                  }}
                >
                  {language.name}
                </Text>
                <Badge 
                  color={levelColors[language.level]}
                  variant="light"
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 500,
                    fontSize: '12px'
                  }}
                >
                  {language.level}
                </Badge>
              </Group>
              <Group gap={8}>
                {(['NATIVE', 'FLUENT', 'CONVERSATIONAL', 'BASIC'] as const).map((level) => (
                  <Button
                    key={level}
                    size="xs"
                    variant={language.level === level ? 'filled' : 'outline'}
                    color={levelColors[level]}
                    onClick={() => updateLanguageLevel(language.name, level)}
                    style={{
                      fontFamily: 'Barlow',
                      fontSize: '11px'
                    }}
                  >
                    {level}
                  </Button>
                ))}
                <Button
                  size="xs"
                  variant="outline"
                  color="red"
                  onClick={() => removeLanguage(language.name)}
                  style={{
                    fontFamily: 'Barlow',
                    fontSize: '11px'
                  }}
                >
                  Remove
                </Button>
              </Group>
            </Group>
          ))}
        </Stack>

        {selectedLanguages.length < 3 && (
          <Box>
            {!showAddLanguage ? (
              <Button
                variant="outline"
                leftSection={<IconPlus size={16} />}
                onClick={() => setShowAddLanguage(true)}
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#6b7280',
                  borderColor: '#e5e7eb'
                }}
              >
                Add Language
              </Button>
            ) : (
              <Stack gap={12}>
                <Group wrap="wrap" gap={8}>
                  {availableLanguages
                    .filter(lang => !selectedLanguages.find(l => l.name === lang))
                    .map((language) => (
                      <Group key={language} gap={4}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addLanguage(language, 'CONVERSATIONAL')}
                          style={{
                            fontFamily: 'Barlow',
                            fontSize: '14px'
                          }}
                        >
                          {language}
                        </Button>
                      </Group>
                    ))}
                </Group>
                <Button
                  variant="subtle"
                  onClick={() => setShowAddLanguage(false)}
                  style={{
                    fontFamily: 'Barlow',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            )}
          </Box>
        )}

        <Group justify="space-between" mt={32}>
          <Button
            variant="outline"
            onClick={onBack}
            style={{
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '16px',
              backgroundColor: '#9ca3af',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px'
            }}
          >
            Back
          </Button>
          <Button
            onClick={onComplete}
            style={{
              fontFamily: 'Barlow',
              fontWeight: 400,
              fontSize: '16px',
              backgroundColor: '#f97316',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px'
            }}
          >
            Proceed
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
