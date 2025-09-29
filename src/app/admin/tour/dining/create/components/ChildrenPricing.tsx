'use client';

import {
  Text,
  Title,
  Stack,
  Group,
  Paper,
  Radio,
  NumberInput,
  Flex
} from '@mantine/core';
import { usePricingPolicy } from '../contexts/PricingPolicyContext';

export default function ChildrenPricing() {
  const { form, shouldShowInfantPricing, shouldShowKidsPricing } = usePricingPolicy();
  const { watch, setValue, formState: { errors } } = form;
  const infantPricing = watch('infantPricing');
  const kidsPricing = watch('kidsPricing');
  const infantDiscount = watch('infantDiscount');
  const kidsDiscount = watch('kidsDiscount');

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
              backgroundColor: shouldShowInfantPricing ? 'white' : '#F9FAFB',
              border: shouldShowInfantPricing ? '1px solid #E5E7EB' : '1px solid #D1D5DB',
              opacity: shouldShowInfantPricing ? 1 : 0.6,
              pointerEvents: shouldShowInfantPricing ? 'auto' : 'none'
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
                disabled={!shouldShowInfantPricing}
                onChange={() => setValue('infantPricing', 'free', {
                  shouldValidate: true,
                  shouldDirty: true,
                })}
                label="Free"
                styles={{
                  label: {
                    fontFamily: 'Barlow',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: shouldShowInfantPricing ? '#374151' : '#9CA3AF'
                  },
                  radio: {
                    borderColor: shouldShowInfantPricing ? '#0D2E61' : '#D1D5DB',
                    '&:checked': {
                      backgroundColor: shouldShowInfantPricing ? '#0D2E61' : '#D1D5DB',
                      borderColor: shouldShowInfantPricing ? '#0D2E61' : '#D1D5DB'
                    }
                  }
                }}
              />
              <Group>
                <Radio
                  value="discounted"
                  checked={infantPricing === 'discounted'}
                  disabled={!shouldShowInfantPricing}
                  onChange={() => setValue('infantPricing', 'discounted', {
                    shouldValidate: true,
                    shouldDirty: true,
                  })}
                  label="Discounted"
                  styles={{
                    label: {
                      fontFamily: 'Barlow',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: shouldShowInfantPricing ? '#374151' : '#9CA3AF'
                    },
                    radio: {
                      borderColor: shouldShowInfantPricing ? '#0D2E61' : '#D1D5DB',
                      '&:checked': {
                        backgroundColor: shouldShowInfantPricing ? '#0D2E61' : '#D1D5DB',
                        borderColor: shouldShowInfantPricing ? '#0D2E61' : '#D1D5DB'
                      }
                    }
                  }}
                />
                <Group gap={8} align="center">
                  <NumberInput
                    value={infantDiscount}
                    onChange={(value) => setValue('infantDiscount', Number(value), {
                      shouldValidate: true,
                      shouldDirty: true,
                    })}
                    min={0}
                    max={100}
                    disabled={!shouldShowInfantPricing || infantPricing !== 'discounted'}
                    styles={{
                      input: {
                        width: 229,
                        height: 59,
                        textAlign: 'left',
                        fontFamily: 'Barlow',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: (!shouldShowInfantPricing || infantPricing !== 'discounted') ? '#9CA3AF' : "#3D3D3D",
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        backgroundColor: (!shouldShowInfantPricing || infantPricing !== 'discounted') ? '#F3F4F6' : '#F9FAFB'
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

          {/* Kids Pricing Card */}
          <Flex
            justify={"space-between"}
            px={30}
            h={85}
            align={"center"}
            style={{
              borderRadius: 15,
              backgroundColor: shouldShowKidsPricing ? 'white' : '#F9FAFB',
              border: shouldShowKidsPricing ? '1px solid #E5E7EB' : '1px solid #D1D5DB',
              opacity: shouldShowKidsPricing ? 1 : 0.6,
              pointerEvents: shouldShowKidsPricing ? 'auto' : 'none'
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
                checked={kidsPricing === 'free'}
                disabled={!shouldShowKidsPricing}
                onChange={() => setValue('kidsPricing', 'free', {
                  shouldValidate: true,
                  shouldDirty: true,
                })}
                label="Free"
                styles={{
                  label: {
                    fontFamily: 'Barlow',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: shouldShowKidsPricing ? '#374151' : '#9CA3AF'
                  },
                  radio: {
                    borderColor: shouldShowKidsPricing ? '#0D2E61' : '#D1D5DB',
                    '&:checked': {
                      backgroundColor: shouldShowKidsPricing ? '#0D2E61' : '#D1D5DB',
                      borderColor: shouldShowKidsPricing ? '#0D2E61' : '#D1D5DB'
                    }
                  }
                }}
              />
              <Group>
                <Radio
                  value="discounted"
                  checked={kidsPricing === 'discounted'}
                  disabled={!shouldShowKidsPricing}
                  onChange={() => setValue('kidsPricing', 'discounted', {
                    shouldValidate: true,
                    shouldDirty: true,
                  })}
                  label="Discounted"
                  styles={{
                    label: {
                      fontFamily: 'Barlow',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: shouldShowKidsPricing ? '#374151' : '#9CA3AF'
                    },
                    radio: {
                      borderColor: shouldShowKidsPricing ? '#0D2E61' : '#D1D5DB',
                      '&:checked': {
                        backgroundColor: shouldShowKidsPricing ? '#0D2E61' : '#D1D5DB',
                        borderColor: shouldShowKidsPricing ? '#0D2E61' : '#D1D5DB'
                      }
                    }
                  }}
                />
                <Group gap={8} align="center">
                  <NumberInput
                    value={kidsDiscount}
                    onChange={(value) => setValue('kidsDiscount', Number(value), {
                      shouldValidate: true,
                      shouldDirty: true,
                    })}
                    min={0}
                    max={100}
                    disabled={!shouldShowKidsPricing || kidsPricing !== 'discounted'}
                    styles={{
                      input: {
                        width: 229,
                        height: 59,
                        textAlign: 'left',
                        fontFamily: 'Barlow',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: (!shouldShowKidsPricing || kidsPricing !== 'discounted') ? '#9CA3AF' : "#3D3D3D",
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        backgroundColor: (!shouldShowKidsPricing || kidsPricing !== 'discounted') ? '#F3F4F6' : '#F9FAFB'
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
  );
}
