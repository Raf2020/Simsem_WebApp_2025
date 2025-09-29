'use client';

import {
  Text,
  Title,
  Stack,
  Paper,
  Select
} from '@mantine/core';
import { usePricingPolicy } from '../contexts/PricingPolicyContext';

export default function AgeRequirements() {
  const { form } = usePricingPolicy();
  const { watch, setValue, formState: { errors } } = form;
  const minimumAge = watch('minimumAge');

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
              value={minimumAge}
              onChange={(value) => setValue('minimumAge', value as any, {
                shouldValidate: true,
                shouldDirty: true,
              })}
              data={[
                { value: '0', label: '0 years (Infants allowed)' },
                { value: '3', label: '3 years' },
                { value: '5', label: '5 years' },
                { value: '12', label: '12 years' },
                { value: '18', label: '18 years' }
              ]}
              error={errors?.minimumAge?.message}
              styles={{
                input: {
                  color: "#3D3D3D",
                  height: 59,
                  fontFamily: 'Barlow',
                  fontWeight: 400,
                  fontSize: '18px',
                  border: errors?.minimumAge
                    ? '1px solid #dc2626'
                    : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  backgroundColor: 'white'
                }
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
