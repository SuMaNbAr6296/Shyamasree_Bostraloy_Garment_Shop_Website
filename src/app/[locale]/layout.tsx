import type { Metadata } from "next";
import { Noto_Serif_Bengali, Hind_Siliguri } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Locale } from "@/config/i18n";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import "../globals.css";

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  weight: ["500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    return {};
  }

  const messages = await getMessages({ locale });
  const seo = (messages as Record<string, unknown>).seo as
    | { title?: string; description?: string }
    | undefined;

  return {
    title: seo?.title || "শ্যামাশ্রী বস্ত্রালয় — Shyamasree Bostraloy",
    description: seo?.description || "",
    metadataBase: new URL("https://www.shyamasreebostraloy.shop"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${hindSiliguri.variable} ${notoSerifBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <StorefrontShell>
            {children}
          </StorefrontShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
