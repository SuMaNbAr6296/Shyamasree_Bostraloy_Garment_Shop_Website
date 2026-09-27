import React from 'react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number;
  currency?: 'INR';
  className?: string;
  priceClassName?: string;
  compareAtClassName?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay({
  price,
  compareAtPrice,
  currency = 'INR',
  className,
  priceClassName,
  compareAtClassName,
  size = 'md',
}: PriceDisplayProps) {
  const locale = useLocale();

  const formatPrice = (amount: number) => {
    if (locale === 'bn') {
      const formattedNum = new Intl.NumberFormat('bn-IN').format(amount);
      return `₹${formattedNum}`;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sizeStyles = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-bold sm:text-lg',
    lg: 'text-xl font-bold sm:text-2xl',
  };

  return (
    <div className={cn('flex items-baseline gap-2 font-sans', className)}>
      <span className={cn('text-primary font-bold tracking-tight', sizeStyles[size], priceClassName)}>
        {formatPrice(price)}
      </span>

      {compareAtPrice && compareAtPrice > price && (
        <span
          className={cn(
            'text-muted-foreground line-through text-xs sm:text-sm font-normal',
            compareAtClassName
          )}
        >
          {formatPrice(compareAtPrice)}
        </span>
      )}
    </div>
  );
}
