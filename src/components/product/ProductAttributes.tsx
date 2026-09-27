import { useTranslations, useLocale } from 'next-intl';
import { ProductAttributes as AttributesType } from '@/domain/product/types';

interface ProductAttributesProps {
  attributes: AttributesType;
}

export function ProductAttributes({ attributes }: ProductAttributesProps) {
  const t = useTranslations('product');
  const locale = useLocale() as 'bn' | 'en';

  if (!attributes) return null;

  const entries = Object.entries(attributes).filter(
    ([, val]) => val && (val[locale] || val.bn)
  );

  if (entries.length === 0) return null;

  const getAttributeLabel = (key: string): string => {
    try {
      return t(key as 'material' | 'fabric' | 'color' | 'occasion' | 'pattern' | 'care');
    } catch {
      return key;
    }
  };

  return (
    <div className="space-y-4 font-sans bg-card p-6 rounded-md border border-border">
      <h3 className="font-serif font-bold text-lg text-foreground border-b border-border pb-2">
        {t('specifications')}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
        {entries.map(([key, val]) => {
          const label = getAttributeLabel(key);
          const value = val ? val[locale] || val.bn : '';

          return (
            <div key={key} className="flex flex-col space-y-0.5 border-b border-border/40 pb-2">
              <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                {label}
              </span>
              <span className="font-semibold text-foreground">
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
