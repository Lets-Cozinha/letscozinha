import type { Metadata } from 'next';
import { Playfair_Display, Lora } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import logo from '../../public/logo.png';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

config.autoAddCss = false;

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
  title: 'Lets Cozinha | O Seu Site de Culinária',
  description:
    'Descubra receitas fáceis e rápidas de preparar. Encontre pratos deliciosos para todas as ocasiões, desde sobremesas até refeições completas.',
  keywords:
    'receitas fáceis, receitas rápidas, sobremesas, pratos principais, culinária',
  openGraph: {
    title: 'Lets Cozinha | O Seu Site de Culinária',
    description:
      'Descubra receitas fáceis e rápidas de preparar. Encontre pratos deliciosos para todas as ocasiões, desde sobremesas até refeições completas.',
    images: [
      {
        url: 'https://www.letscozinha.com.br/logo-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Lets Cozinha | O Seu Site de Culinária',
      },
    ],
    url: 'https://www.letscozinha.com.br',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${playfairDisplay.variable}`}>
      <body className={`${lora.className} bg-neutral text-text-dark`}>
        <header className="flex items-center justify-between gap-4 px-4 md:px-10 py-5 md:py-6">
          <Link href="/">
            <Image src={logo} alt="Lets Cozinha" height={60} />
          </Link>
          <nav className="flex text-3xl md:text-3xl gap-5">
            <Link href="/receitas">
              <FontAwesomeIcon icon={faSearch} />
            </Link>
            <Link
              href="https://www.instagram.com/lets_cozinha/"
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </nav>
        </header>
        <main className="container mb-10">
          <div className={lora.className}>{children}</div>
        </main>
        <footer className="bg-primary text-black p-5 flex justify-center">
          <p>© 2024 Lets Cozinha</p>
        </footer>
      </body>
    </html>
  );
}
