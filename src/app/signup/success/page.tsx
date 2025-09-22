'use client';

import {
  Text,
  Title,
  Stack,
  Box,
  Paper,
  ThemeIcon,
  Container,
  Image
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export default function Success() {
  return (
    <Box style={{
      minHeight: '100vh',
      background: `linear-gradient(to bottom,
        #1e3a8a 0%,
        #1e3a8a 275px,
        #ffffff 275px,
        #ffffff 100%)`
    }}>
      <Container
        size="lg"
        py={{ base: 'xl', sm: 'xl' }}
        px={{ base: 0, sm: "lg" }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center"
        }}
      >
        <Box
          mb={{ base: 24, sm: 36 }}
          w={{ base: 280, sm: 340 }}
          h={{ base: 80, sm: 95 }}
          style={{ alignItems: "center", justifyContent: "center", display: "flex" }}
        >
          <Box
            w={{ base: 140, sm: 176 }}
            h={{ base: 58, sm: 72.7 }}
            style={{ overflow: "hidden" }}
          >
            <Image fit="fill" alt={"Simsen-Logo"} src={"/logo/simsem-tr-bg.svg"} />
          </Box>
        </Box>

        <Paper
          shadow="xl"
          radius="lg"
          p={{ base: 'sm', sm: 'xl' }}
          py={{ base: 'xl', sm: "xl" }}
          mb={{ base: 'lg', sm: 'xl' }}
          mx={{ base: 0, sm: 0 }}
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '1114px',
            border: 'none',
            position: 'relative',
            zIndex: 2,
            textAlign: 'center'
          }}
        >
          <Stack gap={32} align="center" style={{ maxWidth: '600px' }}>
            <ThemeIcon
              size={80}
              radius="xl"
              style={{
                backgroundColor: '#f97316',
                color: '#ffffff'
              }}
            >
              <IconCheck size={40} stroke={3} />
            </ThemeIcon>

            <Box>
              <Title
                order={2}
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 600,
                  fontSize: '32px',
                  color: '#0D2E61',
                  marginBottom: '16px',
                  lineHeight: '1.2'
                }}
              >
                Your application is now under review!
              </Title>

              <Text
                style={{
                  fontFamily: 'Barlow',
                  fontWeight: 400,
                  fontSize: '18px',
                  color: '#6b7280',
                  lineHeight: '1.5',
                  maxWidth: '500px',
                  margin: '0 auto'
                }}
              >
                Expect an email from us within 24 hours — your path to sharing authentic experiences is about to unfold.
              </Text>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
