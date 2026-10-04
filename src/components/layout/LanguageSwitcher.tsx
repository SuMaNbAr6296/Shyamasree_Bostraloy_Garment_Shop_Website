'use client';

import React, { Suspense, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'header' | 'mobile';
}

function LanguageSwitcherContent({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (newLocale: 'bn' | 'en') => {
    if (newLocale === locale) return;

    startTransition(() => {
      const queryString = searchParams ? searchParams.toString() : '';
      const targetPath = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(targetPath, { locale: newLocale });
    });
  };

  return (
    <div
      role="group"
      aria-label="Language selection"
      suppressHydrationWarning
      className={cn(
        'inline-flex items-center rounded-sm border border-border bg-card p-0.5 shadow-xs font-sans text-xs select-none',
        isPending && 'opacity-70 pointer-events-none',
        className
      )}
    >
      <button
        type="button"
        suppressHydrationWarning
        onClick={() => handleSwitch('bn')}
        disabled={isPending}
        className={cn(
          'px-2.5 py-1 rounded-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          locale === 'bn'
            ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-label="বাংলা ভাষায় পরিবর্তন করুন"
        aria-pressed={locale === 'bn'}
      >
        বাংলা
      </button>

      <span className="text-border px-0.5 text-[10px] select-none">|</span>

      <button
        type="button"
        suppressHydrationWarning
        onClick={() => handleSwitch('en')}
        disabled={isPending}
        className={cn(
          'px-2.5 py-1 rounded-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          locale === 'en'
            ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-label="Switch to English language"
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}

export function LanguageSwitcher(props: LanguageSwitcherProps) {
  return (
    <Suspense
      fallback={
        <div className="inline-flex items-center h-7 px-3 rounded-sm border border-border bg-card text-xs text-muted-foreground">
          BN | EN
        </div>
      }
    >
      <LanguageSwitcherContent {...props} />
    </Suspense>
  );
}
