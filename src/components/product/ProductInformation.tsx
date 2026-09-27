import { useTranslations, useLocale } from 'next-intl';
import { Product } from '@/domain/product/types';
import { Category } from '@/domain/category/types';
import { PriceDisplay } from '@/components/catalog/PriceDisplay';
import { Badge } from '@/components/ui/Badge';
import { ProductPurchasePanel } from './ProductPurchasePanel';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

interface ProductInformationProps {
  product: Product;
  category?: Category | null;
}

export function ProductInformation({ product, category }: ProductInformationProps) {
  const t = useTranslations('product');
  const locale = useLocale() as 'bn' | 'en';

  const name = product.name[locale] || product.name.bn;
  const shortDesc = product.shortDescription[locale] || product.shortDescription.bn;
  const categoryName = category ? category.name[locale] || category.name.bn : null;

  const availabilityBadgeMap = {
    in_stock: {
      label: t('inStock'),
      variant: 'success' as const,
      icon: CheckCircle2,
    },
    out_of_stock: {
      label: t('outOfStock'),
      variant: 'outline' as const,
      icon: XCircle,
    },
    coming_soon: {
      label: t('comingSoon'),
      variant: 'secondary' as const,
      icon: Clock,
    },
  };

  const status = availabilityBadgeMap[product.availability];
  const StatusIcon = status.icon;

  // Calculate discount percentage if compareAtPrice exists
  let discountPercent = 0;
  if (product.compareAtPrice && product.compareAtPrice > product.price) {
    discountPercent = Math.round(
      ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Category & Status Badges */}
      <div className="flex flex-wrap items-center gap-2">
        {categoryName && (
          <Badge variant="outline" className="text-xs">
            {categoryName}
          </Badge>
        )}
        <Badge variant={status.variant} className="gap-1 text-xs">
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{status.label}</span>
        </Badge>
        {product.newArrival && <Badge variant="secondary">{locale === 'bn' ? 'নতুন' : 'New'}</Badge>}
        {product.bestSeller && <Badge variant="accent">{locale === 'bn' ? 'সেরা বিক্রি' : 'Best Seller'}</Badge>}
      </div>

      {/* Product Title & Short Description */}
      <div className="space-y-2">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground tracking-tight leading-tight">
          {name}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {shortDesc}
        </p>
      </div>

      {/* Price Display */}
      <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-md border border-border">
        <PriceDisplay
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          currency={product.currency}
          size="lg"
        />
        {discountPercent > 0 && (
          <Badge variant="secondary" className="font-bold text-xs">
            {discountPercent}% {t('saveAmount')}
          </Badge>
        )}
      </div>

      {/* Tags list if present */}
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {product.tags.map((tag, idx) => (
            <span key={idx} className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-xs font-sans">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Interactive Purchase Panel */}
      <ProductPurchasePanel product={product} />
    </div>
  );
}
