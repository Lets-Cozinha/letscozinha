import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Lora } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import * as React from 'react';
import { LayoutAside } from 'src/components/LayoutAside';
import { Header } from 'src/components/Header';
import { GoogleAnalytics } from '@next/third-parties/google';
import { WEBSITE_NAME, BASE_URL } from 'src/constants';
import './fa.css';
import './globals.css';

/**
 * Headers
 */
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

/**
 * Body
 */
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export const metadata: Metadata = {
  /**
   * https://developers.google.com/search/docs/appearance/title-link
   */
  title: `${WEBSITE_NAME} - Receitas deliciosas para todas as ocasiões`,
  description:
    'Descubra todos os tipos de receitas. Encontre pratos deliciosos para todas as ocasiões, desde sobremesas até refeições completas.',
  keywords:
    'receitas deliciosas, pratos gourmet, dicas de culinária, tutoriais de cozinha',
  openGraph: {
    images: [
      {
        url: 'https://www.letscozinha.com.br/logo-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Lets Cozinha logo',
      },
    ],
    url: BASE_URL,
    siteName: WEBSITE_NAME,
    type: 'website',
  },
  alternates: {
    canonical: './',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

const Footer = () => {
  return (
    <footer className="bg-primary py-lg">
      <div className="container flex justify-center">
        <p>© 2024 Lets Cozinha</p>
      </div>
    </footer>
  );
};

const isProduction = process.env.NODE_ENV === 'production';

export default function RootLayout({
  children,
  hero,
}: Readonly<{
  children: React.ReactNode;
  hero: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${playfairDisplay.variable} ${lora.variable}`}
    >
      <body>
        <Header />
        <main className="md:pb-xl">
          <React.Suspense fallback={<div className="h-[200px]"></div>}>
            {hero}
          </React.Suspense>
          <div className="container my-lg md:my-xl flex flex-col md:flex-row gap-sm md:gap-xl">
            <div className="flex-1">
              <React.Suspense fallback={null}>{children}</React.Suspense>
            </div>
            <LayoutAside />
          </div>
        </main>
        <Footer />
        <Analytics mode="production" />
        {isProduction && <SpeedInsights />}
      </body>
      {isProduction && <GoogleAnalytics gaId="G-KBBBK8ZDJG" />}
    </html>
  );
}
