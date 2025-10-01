'use client';

import { Stack, StackProps } from '@mantine/core';
import { ReactNode } from 'react';

interface ResponsiveStackProps extends Omit<StackProps, 'px' | 'py' | 'p'> {
  children: ReactNode;
  variant?: 'default' | 'inner' | 'form';
}

export function ResponsiveStack({ 
  children, 
  variant = 'default',
  ...props 
}: ResponsiveStackProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'inner':
        return {
          px: { base: 0, sm: 30 },
          gap: 20
        };
      case 'form':
        return {
          px: { base: 10, sm: 20 },
          gap: 16
        };
      default:
        return {
          px: { base: 10, sm: 20 },
          gap: 20
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Stack
      {...variantStyles}
      {...props}
      gap={props.gap || variantStyles.gap}
    >
      {children}
    </Stack>
  );
}
