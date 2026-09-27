'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function SearchInput({ value, onChange, onSubmit, onClose }: SearchInputProps) {
  const t = useTranslations('search');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Autofocus input when overlay mounts
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="relative flex items-center w-full font-sans">
      <div className="absolute left-3.5 text-muted-foreground pointer-events-none">
        <Search className="w-5 h-5 text-primary" />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('placeholder')}
        className="w-full pl-11 pr-20 py-3.5 bg-card text-foreground rounded-md border border-border text-sm sm:text-base placeholder:text-muted-foreground/70 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-secondary shadow-xs"
        aria-label={t('title')}
      />

      <div className="absolute right-3 flex items-center gap-1">
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors cursor-pointer"
            aria-label={t('clear')}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
