import { useTranslations } from 'next-intl';

export function AnnouncementBar() {
  const t = useTranslations('common');

  return (
    <aside
      aria-label="Announcement"
      className="bg-primary text-primary-foreground py-2 px-4 text-center text-xs font-sans font-medium tracking-wide border-b border-primary-hover/30 select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
        <p className="truncate">{t('announcement')}</p>
      </div>
    </aside>
  );
}
