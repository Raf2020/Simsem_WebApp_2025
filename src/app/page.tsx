import Link from "next/link";
import { Container, Title, Button, Stack, Box } from '@mantine/core';

export default function Home() {
  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
      }}
    >
      <Container>
        <Stack align="center" gap="xl">
          <Title
            order={1}
            style={{
              color: 'white',
              fontSize: '48px',
              fontFamily: 'cursive',
              letterSpacing: '2px'
            }}
          >
            Simsem
          </Title>

          <Link href="/signup" style={{ textDecoration: 'none' }}>
            <Button
              size="lg"
              style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 32px',
                fontSize: '18px',
                fontWeight: 500
              }}
            >
              Start Signup Process
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
