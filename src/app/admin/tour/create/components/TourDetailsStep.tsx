'use client';

import { useState } from 'react';
import {
  Title,
  Stack,
  Box
} from '@mantine/core';

// Import the section components
import TourBasicInfoSection from './TourBasicInfoSection';
import TourInclusionsSection from './TourInclusionsSection';
import TourItinerarySection from './TourItinerarySection';
import TourThingsToKnowSection from './TourThingsToKnowSection';
import TourPickupPointSection from './TourPickupPointSection';

interface BasicInformationStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function BasicInformationStep({ onNext, onBack }: BasicInformationStepProps) {
  const [tourTitle, setTourTitle] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tourOverview, setTourOverview] = useState('');

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

      <Stack gap={20}>
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
          Tour Details
        </Title>
        {/* Basic Information Section */}
        <TourBasicInfoSection
          tourTitle={tourTitle}
          setTourTitle={setTourTitle}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          tourOverview={tourOverview}
          setTourOverview={setTourOverview}
        />

        {/* Inclusions & Exclusions Section */}
        <TourInclusionsSection />

        {/* Detailed Itinerary Section */}
        <TourItinerarySection />
        {/* Things to Know Section */}
        <TourThingsToKnowSection />
        {/* Pickup Point Section */}
        <TourPickupPointSection />
      </Stack>
    </Box>
  );
}
