// import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages(locale);

  return (
    <html dir={locale === "en" ? "ltr" : "rtl"}>
      <body dir={locale === "en" ? "ltr" : "rtl"}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
