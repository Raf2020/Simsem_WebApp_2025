'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BunnyCDNImageProps {
  src: string; // Just the filename/path, e.g., "uploads/photo1.jpg"
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  fallbackSrc?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
}

const BUNNY_CDN_BASE_URL = 'https://simsem-app-dev.b-cdn.net';

export default function BunnyCDNImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  fallbackSrc = '/images/temp-dish.png',
  priority = false,
  fill = false,
  sizes,
  quality = 75,
  ...props
}: BunnyCDNImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Construct the full CDN URL
  const cdnUrl = `${BUNNY_CDN_BASE_URL}/${src.startsWith('/') ? src.slice(1) : src}`;

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  // Use fallback if there's an error
  const imageSrc = error ? fallbackSrc : cdnUrl;

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        style={style}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
        sizes={sizes}
        quality={quality}
        {...props}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 300}
      height={height || 200}
      className={className}
      style={style}
      onError={handleError}
      onLoad={handleLoad}
      priority={priority}
      sizes={sizes}
      quality={quality}
      {...props}
    />
  );
}

// Helper function to construct BunnyCDN URLs
export function getBunnyCDNUrl(filename: string): string {
  return `${BUNNY_CDN_BASE_URL}/${filename.startsWith('/') ? filename.slice(1) : filename}`;
}

// Hook for managing BunnyCDN images
export function useBunnyCDNImage(filename: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const url = getBunnyCDNUrl(filename);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return {
    url,
    loading,
    error,
    handleLoad,
    handleError,
  };
}
