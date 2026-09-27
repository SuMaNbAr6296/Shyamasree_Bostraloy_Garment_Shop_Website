import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  containerClassName?: string;
  headerClassName?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Section({
  children,
  className,
  eyebrow,
  title,
  description,
  containerClassName,
  headerClassName,
  size = 'md',
  ...props
}: SectionProps) {
  const paddingMap = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-20',
    lg: 'py-16 md:py-28',
  };

  return (
    <section className={cn(paddingMap[size], className)} {...props}>
      <Container className={containerClassName}>
        {(eyebrow || title || description) && (
          <div className={cn('mb-8 md:mb-12 max-w-2xl text-center mx-auto space-y-2', headerClassName)}>
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary font-sans">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
