'use client';

import {
  Text,
  Title,
  Button,
  Stack,
  Group,
  TextInput,
  Paper,
  Radio,
  Flex
} from '@mantine/core';
import { IconPlus, IconTrash, IconWalk } from '@tabler/icons-react';
import { usePricingPolicy } from '../contexts/PricingPolicyContext';

export default function Pricing() {
  const {
    form,
    packagesArray,
    shouldShowInfantPricing,
    shouldShowKidsPricing
  } = usePricingPolicy();

  const { watch, setValue, formState: { errors } } = form;
  const pricingType = watch('pricingType');
  const fixedPricePerPerson = watch('fixedPricePerPerson');
  const packages = watch('packages');
  const infantPricing = watch('infantPricing');
  const infantDiscount = watch('infantDiscount');
  const kidsPricing = watch('kidsPricing');
  const kidsDiscount = watch('kidsDiscount');

  // Calculate children pricing based on adult price and discounts
  const calculateChildPrice = (adultPrice: number, pricingType: 'free' | 'discounted', discount?: number) => {
    if (pricingType === 'free') return 0;
    if (pricingType === 'discounted' && discount) {
      return Math.round((adultPrice * (100 - discount)) / 100 * 100) / 100; // Round to 2 decimal places
    }
    return adultPrice;
  };

  const addPackage = () => {
    packagesArray.append({
      name: `Package ${packagesArray.fields.length + 1}`,
      minTravelers: 1,
      maxTravelers: 1,
      pricePerPerson: 0,
      adults: 0,
      kids: 0,
      infants: 0
    });
  };

  const removePackage = (index: number) => {
    packagesArray.remove(index);
  };

  return (
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
              {/* Fixed Pricing Section */}
              <Stack gap={"lg"}>
                <Radio
                  value="fixed"
                  checked={pricingType === 'fixed'}
                  onChange={() => setValue('pricingType', 'fixed', {
                    shouldValidate: true,
                    shouldDirty: true,
                  })}
                  label="Fixed Price"
                  styles={{
                    label: {
                      fontFamily: 'Barlow',
                      fontSize: '24px',
                      fontWeight: 700,
                      color: pricingType === 'fixed' ? '#0D2E61' : '#3D3D3DB2'
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
                    backgroundColor: pricingType === 'fixed' ? '#0D2E610D' : '#3D3D3D08',
                    border: pricingType === 'fixed' ? '1px solid #0D2E6199' : '1px solid #3D3D3DB2'
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
                    <Stack gap={20}>
                      {/* Fixed Price Header */}
                      <Group align="center" justify="space-between" pb={15} style={{
                        borderBottom: "1px solid #3D3D3D1A"
                      }}>
                        <Group gap={5}>
                          <IconWalk
                            size={20}
                            color={pricingType === 'fixed' ? '#0D2E61' : '#3D3D3D'}
                            style={{
                              flexShrink: 0
                            }}
                          />
                          <Text
                            style={{
                              fontFamily: 'Barlow',
                              fontWeight: 700,
                              fontSize: '23px',
                              color: pricingType === 'fixed' ? '#0D2E61' : '#3D3D3D'
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
                              backgroundColor: pricingType === 'fixed' ? '#FB8B2433' : '#F3F4F6',
                              borderRadius: '12px',
                              padding: '6px 12px'
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: 'Barlow',
                                fontWeight: 400,
                                fontSize: '15px',
                                color: pricingType === 'fixed' ? '#CB4628' : '#374151'
                              }}
                            >
                              Adults
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Barlow',
                                fontWeight: 700,
                                fontSize: '15px',
                                color: pricingType === 'fixed' ? '#CB4628' : '#374151'
                              }}
                            >
                              {fixedPricePerPerson || 65}$
                            </Text>
                          </Flex>

                          {shouldShowKidsPricing && (
                            <Flex
                              h={38}
                              align={"center"}
                              gap={5}
                              style={{
                                backgroundColor: pricingType === 'fixed' ? '#FB8B2433' : '#F3F4F6',
                                borderRadius: '12px',
                                padding: '6px 12px'
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: 'Barlow',
                                  fontWeight: 400,
                                  fontSize: '15px',
                                  color: pricingType === 'fixed' ? '#CB4628' : '#374151'
                                }}
                              >
                                Kids
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'Barlow',
                                  fontWeight: 700,
                                  fontSize: '15px',
                                  color: pricingType === 'fixed' ? '#CB4628' : '#374151'
                                }}
                              >
                                {calculateChildPrice(fixedPricePerPerson || 65, kidsPricing, kidsDiscount)}$
                              </Text>
                            </Flex>
                          )}

                          {shouldShowInfantPricing && (
                            <Flex
                              h={38}
                              align={"center"}
                              gap={5}
                              style={{
                                backgroundColor: pricingType === 'fixed' ? '#FB8B2433' : '#F3F4F6',
                                borderRadius: '12px',
                                padding: '6px 12px'
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: 'Barlow',
                                  fontWeight: 400,
                                  fontSize: '15px',
                                  color: pricingType === 'fixed' ? '#CB4628' : '#374151'
                                }}
                              >
                                Infants
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'Barlow',
                                  fontWeight: 700,
                                  fontSize: '15px',
                                  color: pricingType === 'fixed' ? '#CB4628' : '#374151'
                                }}
                              >
                                {calculateChildPrice(fixedPricePerPerson || 65, infantPricing, infantDiscount)}$
                              </Text>
                            </Flex>
                          )}
                        </Flex>
                      </Group>

                      {/* Price Per Person Input */}
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
                            value={fixedPricePerPerson || ''}
                            onChange={(e) => setValue('fixedPricePerPerson', Number(e.target.value), {
                              shouldValidate: true,
                              shouldDirty: true,
                            })}
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
                            error={errors?.fixedPricePerPerson?.message}
                            styles={{
                              input: {
                                border: errors?.fixedPricePerPerson
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
                      </Flex>
                    </Stack>
                  </Paper>
                </Paper>
              </Stack>

              {/* Package Pricing Section */}
              <Stack gap={"lg"}>
                <Radio
                  value="package"
                  checked={pricingType === 'package'}
                  onChange={() => setValue('pricingType', 'package', {
                    shouldValidate: true,
                    shouldDirty: true,
                  })}
                  label="Package Pricing"
                  styles={{
                    label: {
                      fontFamily: 'Barlow',
                      fontSize: '24px',
                      fontWeight: 700,
                      color: pricingType === 'package' ? '#0D2E61' : '#3D3D3DB2'
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
                    backgroundColor: pricingType === 'package' ? '#0D2E610D' : '#3D3D3D08',
                    border: pricingType === 'package' ? '1px solid #0D2E6199' : '1px solid #3D3D3DB2'
                  }}
                >
                  <Stack gap={"lg"}>
                    {packagesArray.fields.map((field: any, index: number) => (
                      <Paper
                        key={field.id}
                        p={20}
                        px={30}
                        radius="lg"
                        style={{
                          backgroundColor: '#F9FAFB',
                          border: '1px solid #3D3D3D1A'
                        }}
                      >
                        <Stack gap={20}>
                          {/* Package Header */}
                          <Group align="center" justify="space-between" pb={15} style={{
                            borderBottom: "1px solid #3D3D3D1A"
                          }}>
                            <Group gap={5}>
                              <IconWalk
                                size={20}
                                color={pricingType === 'package' ? '#0D2E61' : '#3D3D3D'}
                                style={{
                                  flexShrink: 0
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: 'Barlow',
                                  fontWeight: 700,
                                  fontSize: '23px',
                                  color: pricingType === 'package' ? '#0D2E61' : '#3D3D3D'
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
                                  backgroundColor: pricingType === 'package' ? '#0D2E611A' : '#F3F4F6',
                                  borderRadius: '12px',
                                  padding: '6px 12px'
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    color: pricingType === 'package' ? '#0D2E61' : '#6B7280'
                                  }}
                                >
                                  {packages?.[index]?.minTravelers || 1}-{packages?.[index]?.maxTravelers || 1} Travelers
                                </Text>
                              </Flex>
                            </Group>
                            <Flex gap={10}>
                              <Flex
                                gap={5}
                                h={38}
                                align={"center"}
                                style={{
                                  backgroundColor: pricingType === 'package' ? '#FB8B2433' : '#F3F4F6',
                                  borderRadius: '12px',
                                  padding: '6px 12px'
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 400,
                                    fontSize: '15px',
                                    color: pricingType === 'package' ? '#CB4628' : '#374151'
                                  }}
                                >
                                  Adults
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: 'Barlow',
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    color: pricingType === 'package' ? '#CB4628' : '#374151'
                                  }}
                                >
                                  {packages?.[index]?.pricePerPerson || 0}$
                                </Text>
                              </Flex>

                              {shouldShowKidsPricing && (
                                <Flex
                                  h={38}
                                  align={"center"}
                                  gap={5}
                                  style={{
                                    backgroundColor: pricingType === 'package' ? '#FB8B2433' : '#F3F4F6',
                                    borderRadius: '12px',
                                    padding: '6px 12px'
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 400,
                                      fontSize: '15px',
                                      color: pricingType === 'package' ? '#CB4628' : '#374151'
                                    }}
                                  >
                                    Kids
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 700,
                                      fontSize: '15px',
                                      color: pricingType === 'package' ? '#CB4628' : '#374151'
                                    }}
                                  >
                                    {calculateChildPrice(packages?.[index]?.pricePerPerson || 0, kidsPricing, kidsDiscount)}$
                                  </Text>
                                </Flex>
                              )}

                              {shouldShowInfantPricing && (
                                <Flex
                                  h={38}
                                  align={"center"}
                                  gap={5}
                                  style={{
                                    backgroundColor: pricingType === 'package' ? '#FB8B2433' : '#F3F4F6',
                                    borderRadius: '12px',
                                    padding: '6px 12px'
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 400,
                                      fontSize: '15px',
                                      color: pricingType === 'package' ? '#CB4628' : '#374151'
                                    }}
                                  >
                                    Infants
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: 'Barlow',
                                      fontWeight: 700,
                                      fontSize: '15px',
                                      color: pricingType === 'package' ? '#CB4628' : '#374151'
                                    }}
                                  >
                                    {calculateChildPrice(packages?.[index]?.pricePerPerson || 0, infantPricing, infantDiscount)}$
                                  </Text>
                                </Flex>
                              )}
                            </Flex>
                            <Button m={0} p={0} style={{ background: "transparent" }} onClick={() => removePackage(index)}>
                              <IconTrash color={pricingType === 'package' ? '#CB4628' : '#6B7280'} size={18} />
                            </Button>
                          </Group>

                          {/* Package Input Fields */}
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
                                value={packages?.[index]?.minTravelers || ''}
                                onChange={(e) => setValue(`packages.${index}.minTravelers`, Number(e.target.value), {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                })}
                                type='number'
                                error={errors?.packages?.[index]?.minTravelers?.message}
                                styles={{
                                  input: {
                                    border: errors?.packages?.[index]?.minTravelers
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
                                value={packages?.[index]?.maxTravelers || ''}
                                onChange={(e) => setValue(`packages.${index}.maxTravelers`, Number(e.target.value), {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                })}
                                type='number'
                                error={errors?.packages?.[index]?.maxTravelers?.message}
                                styles={{
                                  input: {
                                    border: errors?.packages?.[index]?.maxTravelers
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
                                value={packages?.[index]?.pricePerPerson || ''}
                                onChange={(e) => setValue(`packages.${index}.pricePerPerson`, Number(e.target.value), {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                })}
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
                                error={errors?.packages?.[index]?.pricePerPerson?.message}
                                styles={{
                                  input: {
                                    border: errors?.packages?.[index]?.pricePerPerson
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
                          </Flex>
                        </Stack>
                      </Paper>
                    ))}
                    <Button
                      leftSection={<IconPlus size={16} />}
                      onClick={addPackage}
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
  );
}
