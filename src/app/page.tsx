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
              fontFamily: 'Barlow',
              letterSpacing: '2px'
            }}
          >
            Simsem App
          </Title>

          <Stack align="center" gap="md">
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

            <Link href="/admin/tour/create" style={{ textDecoration: 'none' }}>
              <Button
                size="lg"
                variant="outline"
                style={{
                  borderColor: 'white',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '12px 32px',
                  fontSize: '18px',
                  fontWeight: 500,
                  backgroundColor: 'transparent'
                }}
              >
                Create Tour
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
