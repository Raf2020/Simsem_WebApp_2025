'use client';

import {
  Text,
  Title,
  Button,
  Stack,
  Box,
  Group,
  Card,
  Textarea,
  SimpleGrid,
  Center,
  UnstyledButton
} from '@mantine/core';
import { IconCoffee, IconToolsKitchen2, IconCake } from '@tabler/icons-react';
import { useMealDetails, mealCategories } from '../contexts/MealDetailsContext';

interface MealDetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function MealDetailsStep({ onNext, onBack }: MealDetailsStepProps) {
  const { form, toggleMealCategory, selectedCategories, isFormValid } = useMealDetails();

  const { register, formState: { errors } } = form;

  return (
    <Box
      w={"100%"}
      p={{ base: 0, sm: 50 }}
      style={{
        borderRadius: "20px",
        gap: "50px",
        backgroundColor: "#FFFFFF"
      }}
    >
      <Stack gap={80}>
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
          Meal Details
        </Title>

        {/* Meal Categories Section */}
        <Box
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '40px'
          }}
        >
          <Stack gap={20}>
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#0D2E61'
              }}
            >
              Meal Categories
            </Text>
            
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 400,
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '20px'
              }}
            >
              Choose which meal categories you'd like to include in your dining experience.
            </Text>

            <SimpleGrid cols={3} spacing={10}>
              {mealCategories.map((category) => (
                <UnstyledButton
                  key={category.id}
                  onClick={() => toggleMealCategory(category.id)}
                  style={{
                    height: '140px',
                    borderRadius: '10px',
                    border: selectedCategories.includes(category.id) 
                      ? '2px solid #0F4C5C' 
                      : '1px solid #E5E7EB',
                    backgroundColor: selectedCategories.includes(category.id) 
                      ? '#F0F9FF' 
                      : '#FFFFFF',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Stack align="center" gap={15}>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px'
                      }}
                    >
                      {category.icon === 'coffee' && <IconCoffee size={40} color={selectedCategories.includes(category.id) ? '#0F4C5C' : '#9CA3AF'} />}
                      {category.icon === 'kitchen' && <IconToolsKitchen2 size={40} color={selectedCategories.includes(category.id) ? '#0F4C5C' : '#9CA3AF'} />}
                      {category.icon === 'cake' && <IconCake size={40} color={selectedCategories.includes(category.id) ? '#0F4C5C' : '#9CA3AF'} />}
                    </Box>
                    
                    <Text
                      style={{
                        fontFamily: 'Barlow',
                        fontWeight: 600,
                        fontSize: '16px',
                        color: selectedCategories.includes(category.id) ? '#0F4C5C' : '#3D3D3D',
                        textAlign: 'center'
                      }}
                    >
                      {category.name}
                    </Text>
                    
                    <Text
                      style={{
                        fontFamily: 'Barlow',
                        fontWeight: 400,
                        fontSize: '12px',
                        color: '#6b7280',
                        textAlign: 'center',
                        lineHeight: '1.3'
                      }}
                    >
                      {category.description}
                    </Text>
                  </Stack>
                </UnstyledButton>
              ))}
            </SimpleGrid>
          </Stack>
        </Box>

        {/* Menu Selection Section */}
        <Box
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '40px'
          }}
        >
          <Stack gap={20}>
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#0D2E61'
              }}
            >
              Menu Selection
            </Text>
            
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 400,
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '20px'
              }}
            >
              Choose from our food library or add your own custom recipes for each category you selected.
            </Text>

            <Textarea
              placeholder="Describe your menu selection or add custom recipes here..."
              {...register('customMenuDescription')}
              error={errors.customMenuDescription?.message}
              styles={{
                input: {
                  width: '100%',
                  height: '150px',
                  borderRadius: '10px',
                  padding: '20px',
                  fontFamily: 'Barlow',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '1.5',
                  border: errors.customMenuDescription ? '1px solid #ef4444' : '1px solid #d1d5db',
                  '&::placeholder': {
                    color: '#9CA3AF'
                  }
                }
              }}
            />
          </Stack>
        </Box>

        {/* Navigation Buttons */}
        <Group justify="space-between" mt={40}>
          <Button
            variant="outline"
            onClick={onBack}
            style={{
              height: '50px',
              borderRadius: '10px',
              fontFamily: 'Barlow',
              fontWeight: 600,
              fontSize: '16px',
              borderColor: '#0F4C5C',
              color: '#0F4C5C',
              minWidth: '120px'
            }}
          >
            Back
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!isFormValid}
            style={{
              height: '50px',
              borderRadius: '10px',
              fontFamily: 'Barlow',
              fontWeight: 600,
              fontSize: '16px',
              backgroundColor: isFormValid ? '#0F4C5C' : '#9CA3AF',
              minWidth: '120px'
            }}
          >
            Next Step
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
