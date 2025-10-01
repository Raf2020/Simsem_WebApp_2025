'use client';

import { Paper, PaperProps } from '@mantine/core';
import { ReactNode } from 'react';

interface ResponsivePaperProps extends PaperProps {
  children: ReactNode;
  variant?: 'default' | 'card' | 'section';
}

export function ResponsivePaper({ 
  children, 
  variant = 'default',
  ...props 
}: ResponsivePaperProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'card':
        return {
          py: 20,
          px: { base: 5, sm: 20 },
          style: {
            backgroundColor: 'white',
            border: '1px solid #E5E7EB'
          }
        };
      case 'section':
        return {
          px: { base: 10, sm: 41 },
          style: {
            backgroundColor: 'white',
            borderRadius: '12px'
          }
        };
      default:
        return {
          p: { base: 10, sm: 20 },
          style: {
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '8px'
          }
        };
    }
  };

  const variantStyles = getVariantStyles();

  const { px, py, p, ...restVariantStyles } = variantStyles;

  return (
    <Paper
      px={props.px || px}
      py={props.py || py}
      p={props.p || p}
      {...restVariantStyles}
      {...props}
      style={{
        ...variantStyles.style,
        ...props.style
      }}
    >
      {children}
    </Paper>
  );
}
