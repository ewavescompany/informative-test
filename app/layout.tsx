// import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "../styles/globals.css";
// import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { Almarai } from 'next/font/google';

const almarai = Almarai({ subsets: ['arabic'], weight: ['400', '700'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  async function getMessages(locale: string) {
    try {
      return (await import(`../translation/${locale}.json`)).default;
    } catch {
      return (await import(`../translation/en.json`)).default;
    }
  }

  const messages = await getMessages(locale);

  return (
    <html dir={locale === "en" ? "ltr" : "rtl"}>
      <body className={almarai.className} dir={locale === "en" ? "ltr" : "rtl"}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
