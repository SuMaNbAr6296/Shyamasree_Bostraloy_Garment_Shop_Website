'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, MessageSquare, MapPin, User, Clock, Globe, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { contactInquirySchema, ContactInquiry } from '@/domain/contact/types';
import { contactService } from '@/services';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function ContactPageClient() {
  const t = useTranslations('contact');
  const locale = useLocale() as 'bn' | 'en';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInquiry>({
    resolver: zodResolver(contactInquirySchema),
  });

  const onSubmit = async (data: ContactInquiry) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await contactService.submitInquiry(data);
      if (result.success) {
        setSubmitResult({
          success: true,
          message: result.message[locale] || result.message.bn,
        });
        reset();
      } else {
        setSubmitResult({
          success: false,
          message: result.message[locale] || result.message.bn,
        });
      }
    } catch (err) {
      console.error('Failed to submit contact form:', err);
      setSubmitResult({
        success: false,
        message: locale === 'bn' ? 'একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।' : 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14732.14631627918!2d87.52554!3d22.61541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0279d46bfbb957%3A0x2ffad1b87b7a5a87!2sDingal%2C%20West%20Bengal%20721232!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

  const mapDirectUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Shyamasree Bostraloy Opposite Dingal Post Office Dingal Hattala Paschim Medinipur West Bengal 721232'
  )}`;

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 bg-background font-sans">
      {/* Page Header */}
      <section className="bg-muted/40 border-b border-border py-10 sm:py-16">
        <Container className="space-y-4 max-w-4xl text-center">
          <nav aria-label="Breadcrumb" className="font-sans text-xs text-muted-foreground flex items-center justify-center gap-2 mb-2">
            <Link href="/" className="hover:text-primary transition-colors">
              {locale === 'bn' ? 'হোম' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{t('title')}</span>
          </nav>

          <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary-hover text-xs font-semibold uppercase tracking-wider font-sans">
            {t('heroEyebrow')}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground leading-tight">
            {t('heroTitle')}
          </h1>

          <p className="font-sans text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </Container>
      </section>

      {/* Main Contact Grid Section */}
      <Section size="md">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Business Info & Actions (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Store Details Card */}
              <div className="bg-card rounded-md border border-border p-6 space-y-6 shadow-2xs">
                <h2 className="font-serif text-xl font-bold text-foreground border-b border-border pb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <span>{locale === 'bn' ? 'দোকানের ঠিকানা ও তথ্য' : 'Store Details & Information'}</span>
                </h2>

                <div className="space-y-4 text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-muted-foreground block uppercase tracking-wider">
                        {t('addressLabel')}
                      </span>
                      <p className="text-foreground font-medium leading-relaxed">
                        {siteConfig.address[locale]}
                      </p>
                    </div>
                  </div>

                  {/* Owner */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-secondary/20 text-secondary-hover shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-muted-foreground block uppercase tracking-wider">
                        {t('ownerLabel')}
                      </span>
                      <p className="text-foreground font-semibold">
                        {siteConfig.owner[locale]}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-accent/20 text-accent shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-muted-foreground block uppercase tracking-wider">
                        {t('phoneLabel')}
                      </span>
                      <a
                        href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                        className="text-primary font-bold hover:underline block text-base"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>

                  {/* Timings */}
                  <div className="flex items-start gap-3 pt-2 border-t border-border/60">
                    <div className="p-2 rounded-full bg-muted text-muted-foreground shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-muted-foreground block uppercase tracking-wider">
                        {t('timingsLabel')}
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {t('timingsText')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Call / WhatsApp Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                    className="block w-full"
                  >
                    <Button variant="primary" size="md" className="w-full gap-2 font-bold shadow-xs">
                      <Phone className="w-4 h-4" />
                      <span>{t('callAction')}</span>
                    </Button>
                  </a>

                  <a
                    href={`https://wa.me/91${siteConfig.phone.replace(/[^0-9]/g, '').slice(-10)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button variant="secondary" size="md" className="w-full gap-2 font-bold shadow-xs">
                      <MessageSquare className="w-4 h-4" />
                      <span>{t('whatsappAction')}</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-card rounded-md border border-border p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {t('formTitle')}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {locale === 'bn'
                    ? 'আপনার যেকোনো প্রশ্ন বা শাড়ি ক্যাটালগ সংক্রান্ত অনুসন্ধানের জন্য নিচে বার্তা লিখুন।'
                    : 'Fill out the form below for any queries, custom orders, or saree availability.'}
                </p>
              </div>

              {/* Success / Error Feedback Alert */}
              {submitResult && (
                <div
                  className={`p-4 rounded-md border text-sm flex items-start gap-3 ${
                    submitResult.success
                      ? 'bg-accent/10 border-accent/30 text-accent'
                      : 'bg-destructive/10 border-destructive/30 text-destructive'
                  }`}
                  role="alert"
                >
                  {submitResult.success ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <p className="font-medium">{submitResult.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-foreground block">
                      {t('nameLabel')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder={t('namePlaceholder')}
                      {...register('name')}
                      className={`w-full px-3 py-2 rounded-xs border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        errors.name ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-destructive font-medium">
                        {errors.name.message?.split('|').find((m) => m.startsWith(locale + ':'))?.replace(locale + ':', '') || errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-foreground block">
                      {t('phoneInputLabel')}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder={t('phonePlaceholder')}
                      {...register('phone')}
                      className={`w-full px-3 py-2 rounded-xs border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        errors.phone ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-destructive font-medium">
                        {errors.phone.message?.split('|').find((m) => m.startsWith(locale + ':'))?.replace(locale + ':', '') || errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-foreground block">
                      {t('emailLabel')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      {...register('email')}
                      className="w-full px-3 py-2 rounded-xs border border-border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-semibold text-foreground block">
                      {t('subjectLabel')}
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder={t('subjectPlaceholder')}
                      {...register('subject')}
                      className={`w-full px-3 py-2 rounded-xs border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        errors.subject ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-destructive font-medium">
                        {errors.subject.message?.split('|').find((m) => m.startsWith(locale + ':'))?.replace(locale + ':', '') || errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-foreground block">
                    {t('messageLabel')}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder={t('messagePlaceholder')}
                    {...register('message')}
                    className={`w-full px-3 py-2 rounded-xs border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      errors.message ? 'border-destructive' : 'border-border'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-destructive font-medium">
                      {errors.message.message?.split('|').find((m) => m.startsWith(locale + ':'))?.replace(locale + ':', '') || errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full font-bold gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t('sending') : t('sendButton')}</span>
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </Section>

      {/* Google Maps Embed Architecture */}
      <Section size="md">
        <Container className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                {locale === 'bn' ? 'গুগল ম্যাপে আমাদের অবস্থান' : 'Store Location on Google Maps'}
              </h2>
              <p className="text-xs text-muted-foreground">
                {locale === 'bn' ? 'ডিঙ্গাল হাটতলা, পশ্চিম মেদিনীপুর, পশ্চিমবঙ্গ ৭২১২৩২' : 'Dingal Hattala, Paschim Medinipur, West Bengal 721232'}
              </p>
            </div>

            <a
              href={mapDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <span>{t('directionsAction')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="relative aspect-16/9 sm:aspect-21/9 w-full rounded-md overflow-hidden border border-border shadow-2xs bg-muted">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shyamasree Bostraloy Google Maps Location"
              className="w-full h-full"
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}
