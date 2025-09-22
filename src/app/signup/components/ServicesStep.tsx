'use client';

import { useState } from 'react';
import {
  Text,
  Title,
  Button,
  Stack,
  Box,
  Group,
  Paper,
  Card,
  Image,
  SimpleGrid,
  Flex
} from '@mantine/core';

interface ServicesStepProps {
  onComplete: () => void;
  onBack: () => void;
}

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

const availableServices: Service[] = [
  {
    id: 'local-living',
    title: 'Local Living Experience',
    description: 'Live like a local in a city like Amman or Aqaba. Enjoy cooking class, neighborhood walk, or coffee shop visit.',
    image: '/images/local-living.jpg'
  },
  {
    id: 'getaway',
    title: 'Getaway Experience',
    description: 'Have a multi-day adventure such as camping or hiking. You provide transport and accommodation. Permits may be required for special areas.',
    image: '/images/getaway.jpg'
  },
  {
    id: 'dining',
    title: 'Dining Experience',
    description: 'Share local flavors by cooking or dining at exciting locations in your favorite restaurants.',
    image: '/images/dining.jpg'
  }
];

export default function ServicesStep({ onComplete, onBack }: ServicesStepProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

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
                fontWeight: 600,
                fontSize: '24px',
                color: '#0D2E61',
              }}
            >
              Services
            </Title>
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 400,
                fontSize: '16px',
                color: '#6b7280'
              }}
            >
              Choose all types of services you would like to provide. You can select more than one
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={20}>
            {availableServices.map((service) => (
              <Paper
                key={service.id}
                shadow="sm"
                withBorder
                // width: '284px',
                //   height: '415px',
                w={{ base: "100%", sm: 284 }}
                h={415}
                style={{
                  borderRadius: '10px',
                  padding: '30px',
                  gap: '10px',
                  cursor: 'pointer',
                  border: selectedServices.includes(service.id)
                    ? '2px solid #f97316'
                    : '1px solid #e5e7eb',
                  backgroundColor: selectedServices.includes(service.id)
                    ? '#fff7ed'
                    : '#ffffff',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onClick={() => toggleService(service.id)}
              >
                <Box>
                  <Box
                    w={{ base: "100%", sm: 224 }}
                    h={184}
                    style={{
                      backgroundColor: '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {service.id === 'local-living' && (
                      <Box
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e5e7eb\'/%3E%3Ctext x=\'50\' y=\'50\' font-family=\'Arial\' font-size=\'12\' fill=\'%236b7280\' text-anchor=\'middle\' dy=\'.3em\'%3ELocal Living%3C/text%3E%3C/svg%3E")',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    )}
                    {service.id === 'getaway' && (
                      <Box
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23dbeafe\'/%3E%3Ccircle cx=\'50\' cy=\'30\' r=\'15\' fill=\'%23ef4444\' stroke=\'%23dc2626\' stroke-width=\'2\'/%3E%3Cpath d=\'M35 45 Q50 35 65 45\' stroke=\'%23374151\' stroke-width=\'2\' fill=\'none\'/%3E%3Ctext x=\'50\' y=\'70\' font-family=\'Arial\' font-size=\'10\' fill=\'%236b7280\' text-anchor=\'middle\'%3EHot Air Balloon%3C/text%3E%3C/svg%3E")',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    )}
                    {service.id === 'dining' && (
                      <Box
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23fef3c7\'/%3E%3Ccircle cx=\'30\' cy=\'40\' r=\'8\' fill=\'%23f59e0b\'/%3E%3Ccircle cx=\'50\' cy=\'35\' r=\'10\' fill=\'%23d97706\'/%3E%3Ccircle cx=\'70\' cy=\'40\' r=\'8\' fill=\'%23f59e0b\'/%3E%3Ctext x=\'50\' y=\'70\' font-family=\'Arial\' font-size=\'10\' fill=\'%236b7280\' text-anchor=\'middle\'%3ELocal Food%3C/text%3E%3C/svg%3E")',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    )}
                  </Box>
                </Box>

                <Stack gap={"md"}>
                  <Text
                    fw={600}
                    style={{
                      fontFamily: 'Barlow',
                      fontSize: '18px',
                      color: "#0D2E61"
                    }}
                  >
                    {service.title}
                  </Text>
                  <Text
                    size="sm"
                    style={{
                      fontFamily: 'Barlow',
                      fontSize: '14px',
                      color: '#6b7280',
                      lineHeight: '1.4'
                    }}
                  >
                    {service.description}
                  </Text>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Paper>
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
          onClick={onComplete}
          w={{ base: '100%', sm: 'auto' }}
          style={{
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            height: '44px',
            fontSize: '14px',
            fontWeight: 500,
            minWidth: '120px'
          }}
        >
          Proceed
        </Button>
      </Flex>
    </Stack>

  );
}
