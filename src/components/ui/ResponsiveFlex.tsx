'use client';

import { Flex, FlexProps } from '@mantine/core';
import { ReactNode } from 'react';

interface ResponsiveFlexProps extends Omit<FlexProps, 'direction'> {
  children: ReactNode;
  variant?: 'default' | 'form' | 'mobile-stack';
}

export function ResponsiveFlex({ 
  children, 
  variant = 'default',
  ...props 
}: ResponsiveFlexProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'form':
        return {
          gap: 20,
          direction: { base: "column", sm: "row" } as const,
          align: { base: "stretch", sm: "flex-start" } as const
        };
      case 'mobile-stack':
        return {
          gap: 16,
          direction: { base: "column", sm: "row" } as const,
          align: { base: "stretch", sm: "center" } as const
        };
      default:
        return {
          gap: 20,
          direction: { base: "column", sm: "row" } as const
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Flex
      {...variantStyles}
      {...props}
    >
      {children}
    </Flex>
  );
}
