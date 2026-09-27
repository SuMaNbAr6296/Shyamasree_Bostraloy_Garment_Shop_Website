'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { useTranslations } from 'next-intl';

interface MobileFilterDrawerProps {
  children: React.ReactNode;
  activeFilterCount?: number;
}

export function MobileFilterDrawer({ children, activeFilterCount = 0 }: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('shop');
  const tCommon = useTranslations('common');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2 text-xs font-semibold"
        aria-expanded={isOpen}
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
        <span>{t('filterLabel')}</span>
        {activeFilterCount > 0 && (
          <span className="ml-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
            {activeFilterCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide Drawer */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t('filterLabel')}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-card border-r border-border z-50 p-6 overflow-y-auto flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-primary" />
                    <h2 className="font-serif font-bold text-base text-foreground">
                      {t('filterLabel')}
                    </h2>
                  </div>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label={tCommon('close')}
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </IconButton>
                </div>

                <div onClick={() => setIsOpen(false)}>
                  {children}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
