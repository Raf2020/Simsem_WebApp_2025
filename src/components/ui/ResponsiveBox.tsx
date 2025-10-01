'use client';

import { Box, BoxProps } from '@mantine/core';
import { ReactNode } from 'react';

interface ResponsiveBoxProps extends Omit<BoxProps, 'w'> {
  children: ReactNode;
  variant?: 'default' | 'form-field' | 'full-mobile';
}

export function ResponsiveBox({ 
  children, 
  variant = 'default',
  ...props 
}: ResponsiveBoxProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'form-field':
        return {
          w: { base: "100%", sm: 187 }
        };
      case 'full-mobile':
        return {
          w: { base: "100%", sm: "auto" }
        };
      default:
        return {
          w: { base: "100%", sm: "auto" }
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Box
      {...variantStyles}
      {...props}
    >
      {children}
    </Box>
  );
}
