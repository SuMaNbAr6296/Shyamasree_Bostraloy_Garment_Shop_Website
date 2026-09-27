import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("errors");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-neutral-50 text-neutral-900">
      <h1 className="text-4xl font-bold font-serif mb-4 text-neutral-950">
        404 — {t("notFound")}
      </h1>
      <Link
        href="/"
        className="px-5 py-2.5 bg-neutral-900 text-white rounded-md text-sm font-medium hover:bg-neutral-800 transition"
      >
        {t("goHome")}
      </Link>
    </main>
  );
}
