import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Sadaqah - Islamic Donation Management',
    default: 'Sadaqah - Islamic Donation Management System',
  },
  description: 'Comprehensive Islamic donation management system for tracking sadaqah, zakat, and charity contributions. Manage donations given and received with complete record keeping in Pakistani Rupees.',
  keywords: [
    'Sadaqah',
    'Islamic donations',
    'Charity management',
    'Zakat tracking',
    'Donation records',
    'Islamic finance',
    'Pakistani Rupees',
    'PKR donations',
    'Muslim charity',
    'Donation tracker'
  ],
  authors: [{ name: 'Sadaqah Team' }],
  creator: 'Sadaqah App',
  publisher: 'Sadaqah',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3002')
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sadaqah - Islamic Donation Management System',
    description: 'Track and manage your Islamic donations, sadaqah, and charity contributions with our comprehensive system designed for the Muslim community.',
    url: process.env.NEXT_PUBLIC_APP_URL || 
         (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3002'),
    siteName: 'Sadaqah',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sadaqah - Islamic Donation Management',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sadaqah - Islamic Donation Management',
    description: 'Track and manage your Islamic donations with ease',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sadaqah - Islamic Donation Management',
    description: 'Comprehensive Islamic donation management system for tracking sadaqah, zakat, and charity contributions.',
    url: process.env.NEXT_PUBLIC_APP_URL || 
         (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3002'),
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PKR',
    },
    featureList: [
      'Donation tracking',
      'Record management', 
      'Islamic compliance',
      'PKR currency support',
      'Comprehensive reporting',
      'Secure authentication'
    ],
    inLanguage: 'en',
    copyrightHolder: {
      '@type': 'Organization',
      name: 'Sadaqah',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#059669" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
