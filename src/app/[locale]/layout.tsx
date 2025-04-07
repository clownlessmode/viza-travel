import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
const font = Manrope({
  variable: "--font",
  subsets: ["latin"],
});

const subfont = Playfair_Display({
  variable: "--font-sub",
  subsets: ["latin"],
  style: ["italic"],
});
// layout.tsx (Next.js App Router)
export const metadata: Metadata = {
  title: "Оформление приглашений в Россию онлайн — visarussia24.ru",
  description:
    "Быстрое и удобное оформление туристических и деловых приглашений для визы в Россию. Без посредников, 100% официально. Онлайн-заявка за 5 минут.",
  keywords: [
    "виза в Россию",
    "приглашение в Россию",
    "туристическое приглашение",
    "деловая виза",
    "visa support Russia",
    "Russian invitation letter",
  ],
  authors: [{ name: "VisaRussia24", url: "https://visarussia24.ru" }],
  creator: "VisaRussia24",
  publisher: "VisaRussia24",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Оформите приглашение в Россию онлайн — за 5 минут",
    description:
      "Официальные визовые приглашения для иностранцев. Туризм, бизнес, деловые поездки. Онлайн без посредников.",
    url: "https://visarussia24.ru",
    siteName: "VisaRussia24",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Invitation to Russia",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Оформите приглашение в Россию онлайн — за 5 минут",
    description:
      "Туристические и деловые приглашения для визы в Россию. Быстро, официально, без посредников.",
    images: ["/og-image.jpg"],
    site: "@VisaRussia24", // если есть Twitter
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${font.variable} ${subfont.variable} antialiased bg-[#F4F6FB]`}
      >
        <NextIntlClientProvider>
          {children} <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
