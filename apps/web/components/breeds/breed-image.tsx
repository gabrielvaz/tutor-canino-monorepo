'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PawPrint } from 'lucide-react';

interface BreedImageProps {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function BreedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: BreedImageProps) {
  const [imageError, setImageError] = useState(false);

  // If no src provided or image has failed to load
  if (!src || imageError) {
    if (fill) {
      return (
        <div className={`flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 ${className}`}>
          <PawPrint size={48} className="text-gray-400 opacity-50" />
        </div>
      );
    }
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 ${className}`}
        style={{ width, height }}
      >
        <PawPrint size={Math.min((width || 100) / 3, 48)} className="text-gray-400 opacity-50" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={() => setImageError(true)}
    />
  );
}
