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
    ],
    'simsen-text-default': [
      '#f5f5f5',
      '#e8e8e8',
      '#d1d1d1',
      '#b4b4b4',
      '#9a9a9a',
      '#3D3D3D',
      '#313131',
      '#2a2a2a',
      '#1f1f1f',
      '#141414'
    ],
    'simsen-blue': [
      '#e8f0ff',
      '#d1e1ff',
      '#a3c3ff',
      '#75a5ff',
      '#4787ff',
      '#0D2E61',
      '#0a254e',
      '#071c3b',
      '#051328',
      '#020a15'
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
