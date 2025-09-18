import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'var(--font-barlow), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'var(--font-barlow), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
  breakpoints: {
    xs: '30em',    // 480px
    sm: '48em',    // 768px
    md: '64em',    // 1024px
    lg: '74em',    // 1184px
    xl: '90em',    // 1440px
  },
  colors: {
    blue: [
      '#e6f3ff',
      '#cce7ff',
      '#99d0ff',
      '#66b8ff',
      '#33a1ff',
      '#0089ff',
      '#0070cc',
      '#005699',
      '#003d66',
      '#002333'
    ]
  },
  components: {
    Button: {
      defaultProps: {
        size: 'md',
      },
    },
    Paper: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
      },
    },
  },
});
