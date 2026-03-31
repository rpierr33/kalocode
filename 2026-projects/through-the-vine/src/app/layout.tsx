import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { RestaurantJsonLd } from '@/components/structured-data'
import { Toaster } from 'sonner'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Through the Vine | Wine Bar & Brunch — Fort Lauderdale',
    template: '%s | Through the Vine',
  },
  description:
    'Discover Through the Vine — Fort Lauderdale\'s boutique wine bar in Flagler Village. Curated global wines, inventive tapas, craft cocktails, and unforgettable brunch. Wine · Bites · Events.',
  keywords: [
    'wine bar',
    'Fort Lauderdale',
    'Flagler Village',
    'brunch',
    'tapas',
    'happy hour',
    'wine tasting',
    'Through the Vine',
  ],
  openGraph: {
    title: 'Through the Vine | Wine Bar & Brunch — Fort Lauderdale',
    description:
      'Fort Lauderdale\'s hidden gem wine bar in Flagler Village. Curated wines, inventive bites, and unforgettable events.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Through the Vine',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Through the Vine Wine Bar',
    description: 'Wine · Bites · Events — Flagler Village, Fort Lauderdale',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} dark`}>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#0A0A0F', color: '#F5F0E8' }}>
        <RestaurantJsonLd />
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            theme="dark"
            position="top-right"
            toastOptions={{
              style: {
                background: '#12121A',
                border: '1px solid #2A2A3A',
                color: '#F5F0E8',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
