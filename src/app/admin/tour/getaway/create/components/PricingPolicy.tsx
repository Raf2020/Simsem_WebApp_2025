'use client';

import {
  Title,
  Stack,
  Box
} from '@mantine/core';
import AgeRequirements from './AgeRequirements';
import ChildrenPricing from './ChildrenPricing';
import Pricing from './Pricing';
import { PricingPolicyProvider } from '../contexts/PricingPolicyContext';

interface PricingPolicyProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PricingPolicy({ onNext, onBack }: PricingPolicyProps) {

  return (
    <PricingPolicyProvider>
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

          {/* Age Requirements Component */}
          <AgeRequirements />

          {/* Children Pricing Component */}
          <ChildrenPricing />

          {/* Pricing Component */}
          <Pricing />
        </Stack>
      </Box>
    </PricingPolicyProvider>
  );
}