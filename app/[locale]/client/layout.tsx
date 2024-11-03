import localFont from "next/font/local";
import Navbar from "@/customComponents/layoutComponents/navbar";
import Footer from "@/customComponents/layoutComponents/footer";
import { getLocale } from "next-intl/server";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  console.log(locale);
  // Providing all messages to the client
  // side is the easiest way to get started

  return (
    <html lang="en">
      <body
        dir={locale === "en" ? "ltr" : "rtl"}
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)] flex flex-col bg-graywhite bg`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
