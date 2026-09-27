import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Category } from '@/domain/category/types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { categoryAssetConfig } from '@/config/category-assets';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  className?: string;
  priority?: boolean;
  variant?: 'featured' | 'standard' | 'wide';
}

export function CategoryCard({
  category,
  className,
  priority = false,
  variant = 'standard',
}: CategoryCardProps) {
  const locale = useLocale() as 'bn' | 'en';
  const name = category.name[locale] || category.name.bn;
  const description = category.description[locale] || category.description.bn;

  const imageSrc = category.image || categoryAssetConfig[category.slug]?.defaultImage || '/assets/banners/banner.png';
  const badgeText = locale === 'bn'
    ? categoryAssetConfig[category.slug]?.badgeBn
    : categoryAssetConfig[category.slug]?.badgeEn;

  const isFeaturedVariant = variant === 'featured';
  const isWideVariant = variant === 'wide';

  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className={cn(
        'group relative overflow-hidden rounded-md border border-border bg-card shadow-xs transition-all duration-300 hover:shadow-md hover:border-secondary/50 flex flex-col',
        isWideVariant && 'sm:flex-row items-center',
        className
      )}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden bg-muted/30',
          isFeaturedVariant ? 'aspect-16/10 sm:aspect-4/3 lg:aspect-16/11' : isWideVariant ? 'aspect-16/9 sm:aspect-4/3 sm:w-1/2' : 'aspect-4/3'
        )}
      >
        <Image
          src={imageSrc}
          alt={name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes={
            isFeaturedVariant
              ? '(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 50vw'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

        {/* Category Badge Tag */}
        {badgeText && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-card/90 text-primary border border-primary/20 backdrop-blur-xs shadow-2xs">
              <Sparkles className="w-3 h-3 text-secondary" />
              <span>{badgeText}</span>
            </span>
          </div>
        )}

        {/* Card Overlay Text */}
        <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
          <h3
            className={cn(
              'font-serif font-bold text-white drop-shadow-xs group-hover:text-amber-200 transition-colors',
              isFeaturedVariant ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-lg sm:text-xl'
            )}
          >
            {name}
          </h3>
          <p className="font-sans text-xs text-zinc-200 line-clamp-2 opacity-90 leading-relaxed max-w-lg">
            {description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-3.5 bg-card flex items-center justify-between text-xs font-semibold text-foreground group-hover:text-primary transition-colors border-t border-border/40 w-full">
        <span>{locale === 'bn' ? 'সংগ্রহ দেখুন' : 'Explore Collection'}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
