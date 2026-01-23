import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ExamCanada - Free Practice Tests for Canadian Exams',
    template: '%s | ExamCanada',
  },
  description:
    'Free practice tests for Canadian government and professional certification exams. ICBC, G1, Citizenship, FoodSafe, and more.',
  keywords: [
    'Canadian practice test',
    'ICBC test',
    'G1 test',
    'citizenship test',
    'FoodSafe',
    'driving test',
    'practice exam',
  ],
  authors: [{ name: 'ExamCanada' }],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://examcanada.online',
    siteName: 'ExamCanada',
    title: 'ExamCanada - Free Practice Tests for Canadian Exams',
    description:
      'Free practice tests for Canadian government and professional certification exams.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExamCanada - Free Practice Tests',
    description:
      'Free practice tests for Canadian government and professional certification exams.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
