'use client';

import { Group, Title, Box, Text } from '@mantine/core';
import { IconWalk } from '@tabler/icons-react';
import { ReactNode } from 'react';

interface ActivityHeaderProps {
  title: string;
  time?: string;
  icon?: ReactNode;
  onRemove?: () => void;
}

export function ActivityHeader({ 
  title, 
  time, 
  icon = <IconWalk size={20} color="#0D2E61" />,
  onRemove 
}: ActivityHeaderProps) {
  
  const formatTime = (timeValue: string) => {
    if (!timeValue) return '12:00AM';
    
    const [hours, minutes] = timeValue.split(':');
    const hour24 = parseInt(hours, 10);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    
    return `${hour12}:${minutes}${ampm}`;
  };

  return (
    <Group 
      align="center" 
      pb={15} 
      style={{ borderBottom: "1px solid #3D3D3D1A" }} 
      justify="space-between"
    >
      <Group gap={10} style={{ flex: 1, minWidth: 0 }}>
        <div style={{ flexShrink: 0 }}>
          {icon}
        </div>
        <Title
          order={4}
          style={{
            fontFamily: 'Barlow',
            fontWeight: 600,
            fontSize: '20px',
            color: '#0D2E61',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1,
            minWidth: 0
          }}
        >
          {title}
        </Title>
      </Group>
      
      <Group gap={10} style={{ flexShrink: 0 }}>
        {time && (
          <Box
            style={{
              backgroundColor: '#F3F4F6',
              borderRadius: '12px',
              padding: '6px 12px',
              flexShrink: 0
            }}
          >
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 500,
                fontSize: '14px',
                color: '#374151'
              }}
            >
              {formatTime(time)}
            </Text>
          </Box>
        )}
        
        {onRemove && (
          <Box
            onClick={onRemove}
            style={{
              backgroundColor: '#FEE2E2',
              borderRadius: '12px',
              padding: '6px 12px',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <Text
              style={{
                fontFamily: 'Barlow',
                fontWeight: 500,
                fontSize: '14px',
                color: '#DC2626'
              }}
            >
              Remove
            </Text>
          </Box>
        )}
      </Group>
    </Group>
  );
}
