'use client';

import {
  Text,
  Title,
  Stack,
  Box,
  Paper,
  ThemeIcon
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export default function SignupSuccess() {
  return (
    <Paper
      p={60}
      radius="md"
      style={{
        maxWidth: '962px',
        width: '100%',
        margin: '0 auto',
        border: '1px solid #e5e7eb',
        textAlign: 'center'
      }}
    >
      <Stack gap={32} align="center">
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
              color: '#1f2937',
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
  );
}
