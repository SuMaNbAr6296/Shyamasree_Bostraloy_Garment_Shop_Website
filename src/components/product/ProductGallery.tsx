'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ProductImage } from '@/domain/product/types';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const locale = useLocale() as 'bn' | 'en';

  if (!images || images.length === 0) {
    return (
      <div className="aspect-4/3 w-full rounded-md bg-muted border border-border flex items-center justify-center text-xs text-muted-foreground font-sans">
        {productName}
      </div>
    );
  }

  const currentImage = images[selectedIndex] || images[0];
  const mainAlt = currentImage.alt[locale] || currentImage.alt.bn || productName;

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails Column / Row */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto shrink-0 py-1">
          {images.map((img, idx) => {
            const thumbAlt = img.alt[locale] || img.alt.bn || `${productName} ${idx + 1}`;
            const isSelected = selectedIndex === idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`View image ${idx + 1}: ${thumbAlt}`}
                aria-pressed={isSelected}
                className={cn(
                  'relative w-16 h-16 sm:w-20 sm:h-20 rounded-sm overflow-hidden border transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 shadow-xs'
                    : 'border-border opacity-70 hover:opacity-100 hover:border-muted-foreground'
                )}
              >
                <Image
                  src={img.src}
                  alt={thumbAlt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Feature Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-md border border-border bg-card shadow-xs flex-1">
        <Image
          src={currentImage.src}
          alt={mainAlt}
          fill
          priority={selectedIndex === 0}
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
