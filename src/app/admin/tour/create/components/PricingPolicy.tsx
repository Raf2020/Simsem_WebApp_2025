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
  Select,
  Radio,
  NumberInput,
  Flex,
  Textarea
} from '@mantine/core';
import { IconCalendar, IconPlus, IconTrash, IconWalk } from '@tabler/icons-react';

interface PricingPolicyProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PricingPolicy({ onNext, onBack }: PricingPolicyProps) {
  const [ageRequirement, setAgeRequirement] = useState('0 years (Infants allowed)');
  const [infantPricing, setInfantPricing] = useState('free');
  const [kidsPricing, setKidsPricing] = useState('free');
  const [kidsDiscount, setKidsDiscount] = useState(50);
  const [pricingType, setPricingType] = useState('package');
  const [fixedPrice, setFixedPrice] = useState(65);
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Package 1',
      travelers: '1-4 Travelers',
      minTravelers: 1,
      maxTravelers: 4,
      pricePerPerson: 65,
      adults: 65,
      kids: 32.5,
      infants: 0
    },
    {
      id: 2,
      name: 'Package 2',
      travelers: '5-15 Travelers',
      minTravelers: 5,
      maxTravelers: 15,
      pricePerPerson: 50,
      adults: 50,
      kids: 25,
      infants: 0
    }
  ]);

  const addPackage = () => {
    const newPackage = {
      id: packages.length + 1,
      name: `Package ${packages.length + 1}`,
      travelers: '1-1 Travelers',
      minTravelers: 1,
      maxTravelers: 1,
      pricePerPerson: 0,
      adults: 0,
      kids: 0,
      infants: 0
    };
    setPackages([...packages, newPackage]);
  };

  const removePackage = (id: number) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  return (
    <Box
      w={"100%"}
      p={{ base: 0, sm: 50 }}
      style={{
        borderRadius: "20px",
        gap: "80px",
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
          Pricing & Policy
        </Title>

        <Paper
          shadow="xl"
          radius="lg"
          px={{ base: 10, sm: 30 }}
          py={40}
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
          <Stack w={"100%"} gap={40}>
            {/* Age Requirements Section */}
            <Stack gap={16}>
              <Title
                order={3}
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 700,
                  fontSize: '28px',
                  color: '#0D2E61'
                }}
              >
                Age Requirements
              </Title>
              <Stack gap={20}>
                <Text
                  style={{
                    fontFamily: 'Barlow',
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#3D3D3D'
                  }}
                >
                  Minimum age to join tour
                </Text>
                <Select
                  value={ageRequirement}
                  onChange={(value) => setAgeRequirement(value || '')}
                  data={[
                    '0 years (Infants allowed)',
                    '3 years',
                    '5 years',
                    '12 years',
                    '18 years'
                  ]}
                  styles={{
                    input: {
                      color: "#3D3D3D",
                      height: 59,
                      fontFamily: 'Barlow',
                      fontWeight: 400,
                      fontSize: '18px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      backgroundColor: 'white'
                    }
                  }}
                />
              </Stack>
            </Stack>


          </Stack>
        </Paper>
        <Paper
          shadow="xl"
          radius="lg"
          px={{ base: 10, sm: 30 }}
          py={40}
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
          <Stack w={"100%"} gap={40}>
            {/* Children Pricing Section */}
            <Stack gap={20}>
              <Title
                order={3}
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 700,
                  fontSize: '28px',
                  color: '#0D2E61'
                }}
              >
                Children Pricing
              </Title>

              {/* Infant Pricing Card */}
              <Flex
                justify={"space-between"}
                px={30}
                h={85}
                align={"center"}
                style={{
                  borderRadius: 15,
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB'
                }}
              >
                <Group justify="space-between" align="center" w={"100%"}>
                  <Group gap={12} align='center'>
                    <Text
                      style={{
                        fontFamily: 'Barlow',
                        fontWeight: 700,
                        fontSize: '20px',
                        color: '#0D2E61'
                      }}
                    >
                      Infant
                    </Text>
                    <Text

                      style={{
                        fontFamily: 'Barlow',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: '#6B7280',
                        backgroundColor: '#F3F4F6',
                        padding: '5px 10px',
                        borderRadius: '15px'
                      }}
                    >
                      Age 0-2
                    </Text>
                  </Group>
                  <Radio
                    value="free"
                    checked={infantPricing === 'free'}
                    onChange={() => setInfantPricing('free')}
                    label="Free"
                    styles={{
                      label: {
                        fontFamily: 'Barlow',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#374151'
                      },
                      radio: {
                        borderColor: '#0D2E61',
                        '&:checked': {
                          backgroundColor: '#0D2E61',
                          borderColor: '#0D2E61'
                        }
                      }
                    }}
                  />
                  <Group>
                    <Radio
                      value="discounted"
                      checked={infantPricing === 'discounted'}
                      onChange={() => setInfantPricing('discounted')}
                      label="Discounted"
                      styles={{
                        label: {
                          fontFamily: 'Barlow',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#374151'
                        },
                        radio: {
                          borderColor: '#0D2E61',
                          '&:checked': {
                            backgroundColor: '#0D2E61',
                            borderColor: '#0D2E61'
                          }
                        }
                      }}
                    />
                    <Group gap={8} align="center">
                      <NumberInput
                        value={kidsDiscount}
                        onChange={(value) => setKidsDiscount(Number(value))}
                        min={0}
                        max={100}
                        styles={{
                          input: {
                            width: 229,
                            height: 59,
                            textAlign: 'left',
                            fontFamily: 'Barlow',
                            fontSize: '18px',
                            fontWeight: 400,
                            color: "#3D3D3D",
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            backgroundColor: '#F9FAFB'
                          }
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: 'Barlow',
                          fontSize: '18px',
                          fontWeight: 400,
                          color: "#3D3D3D",
                        }}
                      >
                        % off
                      </Text>
                    </Group>
                  </Group>

                </Group>
              </Flex>
              <Flex
                justify={"space-between"}
                px={30}
                h={85}
                align={"center"}
                style={{
                  borderRadius: 15,
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB'
                }}
              >
                <Group justify="space-between" align="center" w={"100%"}>
                  <Group gap={12} align='center'>
                    <Text
                      style={{
                        fontFamily: 'Barlow',
                        fontWeight: 700,
                        fontSize: '20px',
                        color: '#0D2E61'
                      }}
                    >
                      Kids
                    </Text>
                    <Text

                      style={{
                        fontFamily: 'Barlow',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: '#6B7280',
                        backgroundColor: '#F3F4F6',
                        padding: '5px 10px',
                        borderRadius: '15px'
                      }}
                    >
                      Age 3-10
                    </Text>
                  </Group>
                  <Radio
                    value="free"
                    checked={infantPricing === 'free'}
                    onChange={() => setInfantPricing('free')}
                    label="Free"
                    styles={{
                      label: {
                        fontFamily: 'Barlow',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#374151'
                      },
                      radio: {
                        borderColor: '#0D2E61',
                        '&:checked': {
                          backgroundColor: '#0D2E61',
                          borderColor: '#0D2E61'
                        }
                      }
                    }}
                  />
                  <Group>
                    <Radio
                      value="discounted"
                      checked={infantPricing === 'discounted'}
                      onChange={() => setInfantPricing('discounted')}
                      label="Discounted"
                      styles={{
                        label: {
                          fontFamily: 'Barlow',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#374151'
                        },
                        radio: {
                          borderColor: '#0D2E61',
                          '&:checked': {
                            backgroundColor: '#0D2E61',
                            borderColor: '#0D2E61'
                          }
                        }
                      }}
                    />
                    <Group gap={8} align="center">
                      <NumberInput
                        value={kidsDiscount}
                        onChange={(value) => setKidsDiscount(Number(value))}
                        min={0}
                        max={100}
                        styles={{
                          input: {
                            width: 229,
                            height: 59,
                            textAlign: 'left',
                            fontFamily: 'Barlow',
                            fontSize: '18px',
                            fontWeight: 400,
                            color: "#3D3D3D",
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            backgroundColor: '#F9FAFB'
                          }
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: 'Barlow',
                          fontSize: '18px',
                          fontWeight: 400,
                          color: "#3D3D3D",
                        }}
                      >
                        % off
                      </Text>
                    </Group>
                  </Group>

                </Group>
              </Flex>

            </Stack>
          </Stack>
        </Paper>
        <Paper
          shadow="xl"
          radius="lg"
          px={{ base: 10, sm: 30 }}
          py={40}
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
          <Stack w={"100%"} gap={40}>
            {/* Children Pricing Section */}
            <Stack gap={20}>
              <Title
                order={3}
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 700,
                  fontSize: '28px',
                  color: '#0D2E61'
                }}
              >
                Pricing
              </Title>
              <Paper
                px={30}
                py={40}
                radius="lg"
                style={{
                  border: '1px solid #00000033'
                }}
              >
                <Stack gap={40}>

                  <Stack gap={"lg"}>
                    <Radio
                      value="fixed"
                      checked={infantPricing === 'fixed'}
                      onChange={() => setInfantPricing('fixed')}
                      label="Fixed Price"
                      styles={{
                        label: {
                          fontFamily: 'Barlow',
                          fontSize: '24px',
                          fontWeight: 700,
                          color: '#3D3D3DB2'
                        },
                        radio: {
                          borderColor: '#0D2E61',
                          '&:checked': {
                            backgroundColor: '#0D2E61',
                            borderColor: '#0D2E61'
                          }
                        }
                      }}
                    />
                    <Paper
                      p={20}
                      px={41}
                      radius="lg"
                      style={{
                        backgroundColor: '#3D3D3D08',
                        border: '1px solid #3D3D3DB2'
                      }}
                    >
                      <Paper
                        p={20}
                        px={30}
                        radius="lg"
                        style={{
                          backgroundColor: '#F9FAFB',
                          border: '1px solid #3D3D3D1A'
                        }}
                      >
                        <Stack gap={20} >
                          {/* Dahshur Activity Header */}
                          <Group align="center" justify="space-between" pb={15} style={{
                            borderBottom: "1px solid #3D3D3D1A"
                          }}>
                            <Group gap={5}>
                              <IconWalk
                                size={20}
                                color="#0D2E61"
                                style={{
                                  flexShrink: 0
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: 'Barlow',
                                  fontWeight: 700,
                                  fontSize: '23px',
                                  color: '#3D3D3D'
                                }}
                              >
                                Fixed Price
                              </Text>
                            </Group>
                            <Flex gap={10}>
                              <Flex
                                gap={5}
                                h={38}
                                align={"center"}
                                style={{
                                  backgroundColor: '#F3F4F6',
                                  borderRadius: '12px',
                                  padding: '6px 12px'
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 400,
                                    fontSize: '15px',
                                    color: '#374151'
                                  }}
                                >
                                  Adults
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    color: '#374151'
                                  }}
                                >
                                  65$
                                </Text>
                              </Flex>

                              <Flex
                                h={38}
                                align={"center"}
                                gap={5}
                                style={{
                                  backgroundColor: '#F3F4F6',
                                  borderRadius: '12px',
                                  padding: '6px 12px'
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 400,
                                    fontSize: '15px',
                                    color: '#374151'
                                  }}
                                >
                                  Kids
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    color: '#374151'
                                  }}
                                >
                                  32.5$
                                </Text>
                              </Flex>
                              <Flex
                                h={38}
                                align={"center"}
                                gap={5}
                                style={{
                                  backgroundColor: '#F3F4F6',
                                  borderRadius: '12px',
                                  padding: '6px 12px'
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 400,
                                    fontSize: '15px',
                                    color: '#374151'
                                  }}
                                >
                                  Infants
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    color: '#374151'
                                  }}
                                >
                                  0$
                                </Text>
                              </Flex>
                            </Flex>
                          </Group>

                          {/* Activity Details Grid */}
                          <Flex gap={20}>
                            <Stack gap={8} py={30}>
                              <Text
                                style={{
                                  fontFamily: 'Barlow',
                                  fontWeight: 700,
                                  fontSize: '18px',
                                  color: '#6B7280'
                                }}
                              >
                                Price Per Person
                              </Text>
                              <TextInput
                                leftSection={
                                  <Text style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    color: '#3D3D3DB2'
                                  }}>
                                    $
                                  </Text>
                                }
                                type='number'
                                rightSectionWidth={80}
                                rightSection={
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 400,
                                      fontSize: '18px',
                                      color: '#3D3D3DB2'
                                    }}>
                                    /person
                                  </Text>

                                }
                                styles={{
                                  input: {
                                    border: "1px solid #3D3D3D14",
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

                          </Flex>


                        </Stack>
                      </Paper>

                    </Paper>
                  </Stack>
                  <Stack gap={"lg"}>
                    <Radio
                      value="package"
                      checked={infantPricing === 'package'}
                      onChange={() => setInfantPricing('package')}
                      label="Package Pricing"
                      styles={{
                        label: {
                          fontFamily: 'Barlow',
                          fontSize: '24px',
                          fontWeight: 700,
                          color: '#3D3D3DB2'
                        },
                        radio: {
                          borderColor: '#0D2E61',
                          '&:checked': {
                            backgroundColor: '#0D2E61',
                            borderColor: '#0D2E61'
                          }
                        }
                      }}
                    />
                    <Paper
                      p={20}
                      px={41}
                      radius="lg"
                      style={{
                        backgroundColor: '#0D2E610D',
                        border: '1px solid #0D2E6199'
                      }}
                    >
                      <Stack gap={"lg"}>
                        <Paper
                          p={20}
                          px={30}
                          radius="lg"
                          style={{
                            backgroundColor: '#F9FAFB',
                            border: '1px solid #3D3D3D1A'
                          }}
                        >
                          <Stack gap={20} >
                            {/* Dahshur Activity Header */}
                            <Group align="center" justify="space-between" pb={15} style={{
                              borderBottom: "1px solid #3D3D3D1A"
                            }}>
                              <Group gap={5}>
                                <IconWalk
                                  size={20}
                                  color="#0D2E61"
                                  style={{
                                    flexShrink: 0
                                  }}
                                />
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 700,
                                    fontSize: '23px',
                                    color: '#0D2E61'
                                  }}
                                >
                                  Package Pricing
                                </Text>
                                <Flex
                                  ml={"sm"}
                                  gap={5}
                                  h={38}
                                  align={"center"}
                                  style={{
                                    backgroundColor: '#0D2E611A',
                                    borderRadius: '12px',
                                    padding: '6px 12px'
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 400,
                                      fontSize: '18px',
                                      color: '#0D2E61'
                                    }}
                                  >
                                    1-4 Travelers
                                  </Text>
                                </Flex>
                              </Group>
                              <Flex gap={10}>
                                <Flex
                                  gap={5}
                                  h={38}
                                  align={"center"}
                                  style={{
                                    backgroundColor: '#FB8B2433',
                                    borderRadius: '12px',
                                    padding: '6px 12px'
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 400,
                                      fontSize: '15px',
                                      color: '#CB4628'
                                    }}
                                  >
                                    Adults
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 700,
                                      fontSize: '15px',
                                      color: '#CB4628'
                                    }}
                                  >
                                    65$
                                  </Text>
                                </Flex>

                                <Flex
                                  h={38}
                                  align={"center"}
                                  gap={5}
                                  style={{
                                    backgroundColor: '#FB8B2433',
                                    borderRadius: '12px',
                                    padding: '6px 12px'
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 400,
                                      fontSize: '15px',
                                      color: '#CB4628'
                                    }}
                                  >
                                    Kids
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 700,
                                      fontSize: '15px',
                                      color: '#CB4628'
                                    }}
                                  >
                                    32.5$
                                  </Text>
                                </Flex>
                                <Flex
                                  h={38}
                                  align={"center"}
                                  gap={5}
                                  style={{
                                    backgroundColor: '#FB8B2433',
                                    borderRadius: '12px',
                                    padding: '6px 12px'
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 400,
                                      fontSize: '15px',
                                      color: '#CB4628'
                                    }}
                                  >
                                    Infants
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 700,
                                      fontSize: '15px',
                                      color: '#CB4628'
                                    }}
                                  >
                                    0$
                                  </Text>
                                </Flex>
                              </Flex>
                              <Button m={0} p={0} style={{ background: "transparent" }}>
                                <IconTrash color='#CB4628' size={18} />
                              </Button>
                            </Group>

                            {/* Activity Details Grid */}
                            <Flex gap={20}>
                              <Stack gap={8} py={30}>
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    color: '#6B7280'
                                  }}
                                >
                                  Minimum no. of travelers
                                </Text>
                                <TextInput
                                  type='number'
                                  styles={{
                                    input: {
                                      border: "1px solid #3D3D3D14",
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
                              <Stack gap={8} py={30}>
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    color: '#6B7280'
                                  }}
                                >
                                  Maximum no. of travelers
                                </Text>
                                <TextInput
                                  type='number'
                                  styles={{
                                    input: {
                                      border: "1px solid #3D3D3D14",
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
                              <Stack gap={8} py={30}>
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    color: '#6B7280'
                                  }}
                                >
                                  Price Per Person
                                </Text>
                                <TextInput
                                  leftSection={
                                    <Text style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 400,
                                      fontSize: '18px',
                                      color: '#3D3D3DB2'
                                    }}>
                                      $
                                    </Text>
                                  }
                                  type='number'
                                  rightSectionWidth={80}
                                  rightSection={
                                    <Text
                                      style={{
                                        fontFamily: 'Barlow',
                                        fontWeight: 400,
                                        fontSize: '18px',
                                        color: '#3D3D3DB2'
                                      }}>
                                      /person
                                    </Text>

                                  }
                                  styles={{
                                    input: {
                                      border: "1px solid #3D3D3D14",
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


                            </Flex>


                          </Stack>
                        </Paper>
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
                          Add Package
                        </Button>
                      </Stack>
                    </Paper>

                  </Stack>

                </Stack>
              </Paper>

            </Stack>
          </Stack>
        </Paper>
      </Stack >
    </Box >
  );
}