'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ProductError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');

  return (
    <Container className="py-20 text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h1 className="text-2xl font-serif font-bold text-foreground">
        {t('notFound')}
      </h1>
      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
        An error occurred while loading this product. Please try again.
      </p>
      <div className="pt-2">
        <Button variant="primary" size="md" onClick={() => reset()} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          <span>Retry</span>
        </Button>
      </div>
    </Container>
  );
}
