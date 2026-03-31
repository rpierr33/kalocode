import type { Metadata } from 'next'
import { WineShowcaseClient } from '@/components/wines/wine-showcase-client'

export const metadata: Metadata = {
  title: 'Wine Collection',
  description:
    'Explore our curated collection of global wines — from Burgundy to Napa, Barolo to Malbec. Through the Vine Wine Bar in Fort Lauderdale.',
  openGraph: {
    title: 'Wine Collection | Through the Vine',
    description: 'Curated global wines from Through the Vine Wine Bar in Flagler Village, Fort Lauderdale.',
  },
}

export default function WinesPage() {
  return <WineShowcaseClient />
}
