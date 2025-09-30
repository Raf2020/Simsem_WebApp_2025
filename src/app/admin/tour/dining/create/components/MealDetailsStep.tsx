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
  UnstyledButton,
  Image,
  Badge,
  Flex,
  Paper,
  Divider
} from '@mantine/core';
import { IconCoffee, IconToolsKitchen2, IconCake, IconPlus, IconTrash } from '@tabler/icons-react';
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
      py={{ base: 0, sm: 50 }}
      style={{
        borderRadius: "20px",
        gap: "50px",
        backgroundColor: "#FFFFFF"
      }}
    >
      <Stack gap={40}>
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
          w={"100%"}
          maw={1104}
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
                fontSize: '28px',
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
                fontSize: '20px',
                lineHeight: '150%',
                letterSpacing: '0%',
                color: '#3D3D3D',
                marginBottom: '20px'
              }}
            >
              Choose which meal categories you&apos;d like to include in your dining experience.
            </Text>

            <SimpleGrid cols={3} spacing={10}>
              {mealCategories.map((category) => (
                <Box key={category.id} style={{ position: 'relative' }}>
                  <UnstyledButton
                    onClick={() => toggleMealCategory(category.id)}
                    style={{
                      width: '322.67px',
                      height: '219.19px',
                      borderRadius: '10px',
                      border: selectedCategories.includes(category.id)
                        ? '2px solid #0D2E61'
                        : '1px solid #0D2E614D',
                      backgroundColor: selectedCategories.includes(category.id)
                        ? '#F0F4FF'
                        : '#FFFFFF',
                      paddingTop: '20px',
                      paddingRight: '30px',
                      paddingBottom: '20px',
                      paddingLeft: '30px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    <Stack align="center" gap={15} style={{ height: '100%', justifyContent: 'center' }}>
                      <Box
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '36.12px',
                          height: '22.78px'
                        }}
                      >
                        {category.icon === 'coffee' && <IconCoffee size={36} color={selectedCategories.includes(category.id) ? '#0D2E61' : '#9CA3AF'} />}
                        {category.icon === 'kitchen' && <IconToolsKitchen2 size={36} color={selectedCategories.includes(category.id) ? '#0D2E61' : '#9CA3AF'} />}
                        {category.icon === 'cake' && <IconCake size={36} color={selectedCategories.includes(category.id) ? '#0D2E61' : '#9CA3AF'} />}
                      </Box>

                      <Text
                        style={{
                          fontFamily: 'Barlow',
                          fontWeight: 700,
                          fontSize: '23px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          color: '#3D3D3D',
                          textAlign: 'center'
                        }}
                      >
                        {category.name}
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Barlow',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          color: '#3D3D3D',
                          textAlign: 'center',
                          position: 'relative',
                        }}
                      >
                        {category.description}
                      </Text>

                      {selectedCategories.includes(category.id) && (
                        <Badge
                          style={{
                            position: 'absolute',
                            bottom: '30px',
                            backgroundColor: '#0D2E61',
                            color: 'white',
                            fontFamily: 'Barlow',
                            fontWeight: 600,
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}
                        >
                          SELECTED
                        </Badge>
                      )}

                    </Stack>
                  </UnstyledButton>

                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Box>


        <Box
          style={{
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '40px'
          }}
        >
          <Stack gap={30}>
            <Stack gap={20}>
              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 700,
                  fontSize: '28px',
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
                  fontSize: '20px',
                  lineHeight: '150%',
                  letterSpacing: '0%',
                  color: '#3D3D3D',
                  marginBottom: '20px'
                }}
              >
                Choose from our food library or add your own custom recipes for each category you selected.
              </Text>
            </Stack>
            <Paper
              mx={"auto"}
              style={{
                width: '100%',
                maxWidth: '1007px',
                borderRadius: '10px',
                display: "flex",
                flexDirection: "column",
                gap: '17px',
                opacity: 1,
                paddingTop: '20px',
                paddingRight: '41px',
                paddingBottom: '20px',
                paddingLeft: '41px',
                borderWidth: '1px',
                backgroundColor: '#0D2E610D',
                border: '1px solid #0D2E6199'
              }}
            >
              {selectedCategories
                .sort((a, b) => {
                  // Define the desired order
                  const order = ['starter', 'main-course', 'dessert'];
                  const categoryA = mealCategories.find(c => c.id === a);
                  const categoryB = mealCategories.find(c => c.id === b);

                  if (!categoryA || !categoryB) return 0;

                  const indexA = order.indexOf(categoryA.id);
                  const indexB = order.indexOf(categoryB.id);

                  return indexA - indexB;
                })
                .map((categoryId) => {
                  const category = mealCategories.find(c => c.id === categoryId);
                  if (!category) return null;

                  return (
                    <Card
                      key={categoryId}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #0D2E614D',
                        borderRadius: '10px',
                      }}
                      px={30}
                      py={20}
                    >
                      <Stack gap={10}>
                        {/* Category Header */}
                        <Group gap={10}>
                          {category.icon === 'coffee' && <IconCoffee size={36} color="#0D2E61" />}
                          {category.icon === 'kitchen' && <IconToolsKitchen2 size={36} color="#0D2E61" />}
                          {category.icon === 'cake' && <IconCake size={36} color="#0D2E61" />}
                          <Text
                            style={{
                              fontFamily: 'Barlow',
                              fontWeight: 600,
                              fontSize: '23px',
                              color: '#0D2E61'
                            }}
                          >
                            {category.name}
                          </Text>
                        </Group>
                        <Divider />
                        {/* Food Items Grid */}
                        <SimpleGrid cols={3} spacing={15} px={20} py={40}>
                          {/* Sample food items - you can make this dynamic */}

                          {[1, 2, 3].map((item) => (
                            <Card
                              key={item}
                              style={{
                                width: '268.33px',
                                height: '236.95px',
                                borderRadius: '10px',
                                padding: '20px',
                                gap: '10px',
                                opacity: 1,
                                borderWidth: '1px',
                                backgroundColor: 'white',
                                border: '1px solid #0D2E614D',
                                position: 'relative',
                                overflow: "unset"
                              }}
                            >
                              <Button
                                size="xs"
                                color="red"
                                style={{
                                  zIndex: 100,
                                  position: 'absolute',
                                  top: '-5px',
                                  right: '-5px',
                                  width: '30px',
                                  height: '28px',
                                  borderRadius: '5px',
                                  gap: '10px',
                                  opacity: 1,
                                  padding: 0,
                                  minWidth: 'unset'
                                }}
                              >
                                <IconTrash size={22}/>
                              </Button>
                              <Stack gap={10}>
                                <Box style={{ position: 'relative' }}>
                                  <Image
                                    src="/api/placeholder/150/100"
                                    alt="Hummus & Pita"
                                    style={{
                                      width: '228.33px',
                                      height: '114.95px',
                                      borderRadius: '10px',
                                      opacity: 1,
                                      objectFit: 'cover'
                                    }}
                                  />
                                </Box>
                                <Group justify="space-between" align="flex-start">
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 700,
                                      fontSize: '18px',
                                      lineHeight: '100%',
                                      letterSpacing: '0%',
                                      color: '#3D3D3D'
                                    }}
                                  >
                                    Hummus & Pita
                                  </Text>
                                  <Badge
                                    size="xs"
                                    style={{
                                      height: '24px',
                                      borderRadius: '10px',
                                      gap: '10px',
                                      opacity: 1,
                                      paddingTop: '5px',
                                      paddingRight: '10px',
                                      paddingBottom: '5px',
                                      paddingLeft: '10px',
                                      backgroundColor: '#FB8B24',
                                      color: 'white',
                                      fontFamily: 'Barlow',
                                      fontWeight: 700,
                                      fontSize: '12px'
                                    }}
                                  >
                                    VEGAN
                                  </Badge>
                                </Group>

                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                    color: '#3D3D3D',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  }}
                                >
                                  Chickpeas, garlic, lemon, sesame paste (Tahini) and olive oil
                                </Text>
                              </Stack>
                            </Card>
                          ))}

                          {/* Add Item Button */}
                          <UnstyledButton
                            style={{
                              width: '268.33px',
                              height: '235px',
                              borderRadius: '10px',
                              padding: '20px',
                              gap: '10px',
                              opacity: 1,
                              borderWidth: '3px',
                              borderStyle: 'dashed',
                              border: '3px dashed #0D2E6180',
                              backgroundColor: '#0D2E611A',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <Center style={{ height: '100%' }}>
                              <Stack align="center" gap={10}>

                                <IconPlus size={48} color="#0D2E61" />

                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                    color: '#0D2E61'
                                  }}
                                >
                                  Add a {category.name.toLowerCase()}
                                </Text>
                              </Stack>
                            </Center>
                          </UnstyledButton>
                        </SimpleGrid>
                      </Stack>
                    </Card>
                  );
                })}
            </Paper>

          </Stack>
        </Box>

      </Stack>
    </Box>
  );
}
