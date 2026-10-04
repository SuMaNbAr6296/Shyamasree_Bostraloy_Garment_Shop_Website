import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { MapPin, Phone, Globe, Store, Map } from 'lucide-react';

export function Footer() {
  const tFooter = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'bn' | 'en';

  const navLinks = [
    { href: '/', label: tNav('home') },
    { href: '/shop', label: tNav('shop') },
    { href: '/categories', label: tNav('categories') },
    { href: '/story', label: tNav('story') },
    { href: '/contact', label: tNav('contact') },
  ] as const;

  return (
    <footer aria-label="Site Footer" className="bg-card border-t-2 border-primary/30 text-foreground font-sans pt-12 sm:pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-sm border border-secondary/40">
                <Image
                  src={siteConfig.assets.logo}
                  alt={tCommon('brandName')}
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <span className="font-serif font-bold text-xl text-primary">
                {tCommon('brandName')}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {tFooter('aboutDesc')}
            </p>
            <p className="text-xs font-semibold text-foreground">
              {tCommon('owner')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-foreground border-b border-secondary/30 pb-2 inline-block">
              {tFooter('quickLinks')}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="font-serif font-bold text-base text-foreground border-b border-secondary/30 pb-2 inline-block">
              {tFooter('contactTitle')}
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{siteConfig.address[locale]}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="hover:text-primary transition-colors font-mono text-xs"
                >
                  {tCommon('phone')}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={siteConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors text-xs"
                >
                  {siteConfig.url.replace('https://', '')}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Store className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="https://share.google/pnl0uLFKEjtwnCHfz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors text-xs font-bold"
                >
                  {tFooter('gmbProfile')}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Map className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="https://maps.app.goo.gl/Fdtbp1941trwyhYs6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors text-xs font-bold"
                >
                  {tFooter('mapLocation')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <Divider className="my-0 border-border/60" />

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {tCommon('brandName')}. {tFooter('rights')}{' '}
            <a 
              href="https://www.sumanbar.online" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold hover:text-primary transition-colors"
            >
              {tFooter('developerName')}
            </a>
          </p>
          <p className="text-[11px]">{tCommon('brandTagline')} — Paschim Medinipur</p>
        </div>
      </Container>
    </footer>
  );
}
