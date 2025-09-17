'use client';

import { Box, Image, Container } from '@mantine/core';
import SignupSuccess from '../components/SignupSuccess';

export default function SignupSuccessPage() {
  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        position: 'relative'
      }}
    >
      {/* Background Logo */}
      <Box
        style={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1
        }}
      >
        <Image
          src="/logo-white.png"
          alt="Simsem"
          style={{
            height: '60px',
            filter: 'brightness(0) invert(1)'
          }}
          fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='60' viewBox='0 0 200 60'%3E%3Ctext x='100' y='35' font-family='Dancing Script, cursive' font-size='32' fill='white' text-anchor='middle'%3ESimsem%3C/text%3E%3C/svg%3E"
        />
      </Box>

      {/* Main Content */}
      <Container
        size="lg"
        style={{
          paddingTop: '150px',
          paddingBottom: '50px',
          position: 'relative',
          zIndex: 2
        }}
      >
        <SignupSuccess />
      </Container>
    </Box>
  );
}
