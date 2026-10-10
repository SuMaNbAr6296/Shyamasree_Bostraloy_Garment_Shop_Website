'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Sparkles, Award, ArrowRight, Store, MapPin, Layers } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function StoryPageClient() {
  const t = useTranslations('story');
  const locale = useLocale() as 'bn' | 'en';

  const stats = [
    { number: t('statYears'), label: t('statYearsLabel'), icon: Award },
    { number: t('statFamilies'), label: t('statFamiliesLabel'), icon: Heart },
    { number: t('statAuthentic'), label: t('statAuthenticLabel'), icon: ShieldCheck },
    { number: t('statProducts'), label: t('statProductsLabel'), icon: Sparkles },
  ];

  const timelineSteps = [
    {
      num: '01',
      title: t('timelineStep1Title'),
      desc: t('timelineStep1Desc'),
      icon: Layers,
    },
    {
      num: '02',
      title: t('timelineStep2Title'),
      desc: t('timelineStep2Desc'),
      icon: Sparkles,
    },
    {
      num: '03',
      title: t('timelineStep3Title'),
      desc: t('timelineStep3Desc'),
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: t('timelineStep4Title'),
      desc: t('timelineStep4Desc'),
      icon: Heart,
    },
  ];

  const philosophies = [
    {
      title: t('philosophy1Title'),
      desc: t('philosophy1Desc'),
      icon: ShieldCheck,
    },
    {
      title: t('philosophy2Title'),
      desc: t('philosophy2Desc'),
      icon: Award,
    },
    {
      title: t('philosophy3Title'),
      desc: t('philosophy3Desc'),
      icon: Heart,
    },
  ];

  return (
    <div className="pb-12 bg-background flex flex-col gap-4 sm:gap-8">
      {/* Hero Banner Header */}
      <section className="relative bg-muted/40 border-b border-border overflow-hidden py-12 sm:py-20">
        <Container className="relative z-10 space-y-6 max-w-4xl text-center">
          <nav aria-label="Breadcrumb" className="font-sans text-xs text-muted-foreground flex items-center justify-center gap-2 mb-4">
            <Link href="/" className="hover:text-primary transition-colors">
              {locale === 'bn' ? 'হোম' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{t('title')}</span>
          </nav>

          <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary-hover text-xs font-semibold uppercase tracking-wider font-sans">
            {t('heroEyebrow')}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight">
            {t('heroTitle')}
          </h1>

          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-sans text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Store className="w-4 h-4 text-primary" />
              {siteConfig.owner[locale]} ({locale === 'bn' ? 'স্বত্বাধিকারী' : 'Proprietor'})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-accent" />
              {locale === 'bn' ? 'ডিঙ্গাল হাটতলা, পশ্চিম মেদিনীপুর' : 'Dingal Hattala, Paschim Medinipur'}
            </span>
          </div>
        </Container>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8C1D28_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </section>

      {/* Editorial History Section (Image + Story Text) */}
      <Section size="sm">
        <Container className="space-y-10">
          {/* Header section on top */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              {locale === 'bn' ? 'আমাদের ইতিহাস' : 'Our Legacy'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {t('historyTitle')}
            </h2>
          </div>

          {/* Banner Image - Full Width & Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-md overflow-hidden border border-secondary/30 shadow-lg bg-card"
          >
            <Image
              src="/assets/banners/Banner2.webp"
              alt={siteConfig.name[locale]}
              width={1200}
              height={600}
              sizes="100vw"
              priority
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Content under the Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto space-y-8 font-sans"
          >
            <div className="space-y-6 sm:columns-2 gap-8 text-center sm:text-left">
              <p className="text-base text-muted-foreground leading-relaxed">
                {t('historyText1')}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed break-inside-avoid">
                {t('historyText2')}
              </p>
            </div>

            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-border">
              <div className="p-6 bg-muted/30 rounded-md border border-border/50 text-center flex flex-col items-center justify-center">
                <span className="font-serif font-bold text-xl text-primary block mb-2">
                  {locale === 'bn' ? 'হস্তচালিত তাঁত শাড়ি' : 'Handloom Sarees'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {locale === 'bn' ? 'বালুচরী, কাতান, জামদানি ও চন্দেরী' : 'Baluchari, Katan Silk, Jamdani & Chanderi'}
                </span>
              </div>
              <div className="p-6 bg-muted/30 rounded-md border border-border/50 text-center flex flex-col items-center justify-center">
                <span className="font-serif font-bold text-xl text-secondary-hover block mb-2">
                  {locale === 'bn' ? 'উৎসব ও বিবাহ পোশাক' : 'Festive & Bridal Wear'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {locale === 'bn' ? 'লেহেঙ্গা, ধুতি, থ্রি-পিস ও সুতি বসন' : 'Lehengas, Dhotis, Suits & Fine Textiles'}
                </span>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Animated Statistics Section */}
      <Section size="sm" className="bg-primary/5 border-y border-primary/10 py-12">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {t('statsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const IconComp = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card p-5 sm:p-6 rounded-md border border-border text-center space-y-2 shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="font-serif font-bold text-2xl sm:text-3xl text-primary">
                    {stat.number}
                  </div>
                  <div className="font-sans text-xs font-medium text-muted-foreground leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Craftsmanship Journey / Timeline Section */}
      <Section size="md">
        <Container className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary font-sans">
              {t('craftsmanshipTitle')}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground">
              {t('timelineTitle')}
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              {t('craftsmanshipDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-card p-6 rounded-md border border-border relative flex flex-col justify-between space-y-4 hover:border-secondary/40 transition-colors shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-bold text-secondary/40">
                      {step.num}
                    </span>
                    <div className="p-2 rounded-full bg-muted text-foreground">
                      <StepIcon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg text-foreground">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Editorial Grid Section (Hero Images Showcase) */}
      <Section size="md" className="bg-muted/20 border-y border-border py-12">
        <Container className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {locale === 'bn' ? 'আমাদের বুনন ও ফ্যাশন ধারা' : 'Our Textile Craft Showcase'}
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              {locale === 'bn' ? 'ঐতিহ্যবাহী মেদিনীপুরী শৈলী ও সমসাময়িক ডিজাইনের সমাহার' : 'Exquisite textures, natural silk, and fine cotton textiles'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="relative rounded-md overflow-hidden border border-border shadow-xs group bg-muted">
              <Image
                src="/assets/decorative/Luxe Katan Silk & Kanjivaram Collection.png"
                alt="Traditional Silk Saree"
                width={1254}
                height={1254}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="font-serif text-sm font-bold block">
                  {locale === 'bn' ? 'কাতান সিল্ক ও কাঞ্জিভরম' : 'Katan Silk & Kanjivaram'}
                </span>
                <span className="text-[11px] font-sans text-white/80">
                  {locale === 'bn' ? 'উৎসবের সেরা উপহার' : 'Pure Silk Collection'}
                </span>
              </div>
            </div>

            <div className="relative rounded-md overflow-hidden border border-border shadow-xs group bg-muted">
              <Image
                src="/assets/decorative/Baluchari & Dhakai Jamdani Elegance.png"
                alt="Bengali Handloom Saree"
                width={1254}
                height={1254}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="font-serif text-sm font-bold block">
                  {locale === 'bn' ? 'বালুচরী ও ধোলাই জামদানি' : 'Baluchari & Dhakai Jamdani'}
                </span>
                <span className="text-[11px] font-sans text-white/80">
                  {locale === 'bn' ? 'সূক্ষ্ম আঁচলের কাজ' : 'Artisan Handloom Work'}
                </span>
              </div>
            </div>

            <div className="relative rounded-md overflow-hidden border border-border shadow-xs group bg-muted">
              <Image
                src="/assets/decorative/Designer Suits & Lehengas Showcase.png"
                alt="Contemporary Attire"
                width={1254}
                height={1254}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="font-serif text-sm font-bold block">
                  {locale === 'bn' ? 'আধুনিক থ্রি-পিস ও লেহেঙ্গা' : 'Designer Suits & Lehengas'}
                </span>
                <span className="text-[11px] font-sans text-white/80">
                  {locale === 'bn' ? 'নতুন ট্রেন্ডি কালেকশন' : 'Contemporary Boutique'}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Brand Philosophy Section */}
      <Section size="md">
        <Container className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {t('philosophyTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philosophies.map((item, idx) => {
              const IconC = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-card p-6 rounded-md border border-border space-y-3 shadow-2xs font-sans"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary/15 text-secondary-hover flex items-center justify-center">
                    <IconC className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Final Call to Action Section */}
      <Section size="md">
        <Container>
          <div className="bg-card rounded-md border border-secondary/30 p-8 sm:p-12 text-center space-y-6 shadow-md relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground">
                {locale === 'bn' ? 'শ্যামাশ্রী বস্ত্রালয়ের সাথে কেনাকাটা শুরু করুন' : 'Experience Authentic Bengali Textile Heritage'}
              </h2>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {locale === 'bn'
                  ? 'ডিঙ্গাল হাটতলায় আমাদের দোকানে এসে আসল কাপড়ের ছোঁয়া নিন অথবা অনলাইন ক্যাটালগে আপনার পছন্দের পোশাকটি খুঁজে দেখুন।'
                  : 'Visit our retail store at Dingal Hattala, Paschim Medinipur or browse our complete product collection online.'}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link href="/shop">
                  <Button variant="primary" size="lg" className="gap-2 font-bold shadow-md">
                    <span>{locale === 'bn' ? 'ক্যাটালগ দেখুন' : 'Explore Shop'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button variant="secondary" size="lg" className="gap-2 font-bold">
                    <span>{locale === 'bn' ? 'দোকানের ঠিকানা' : 'Store Location'}</span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </Container>
      </Section>
    </div>
  );
}
