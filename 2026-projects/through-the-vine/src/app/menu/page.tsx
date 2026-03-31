import type { Metadata } from 'next'
import { MenuPageClient } from '@/components/menu/menu-page-client'

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Explore our curated wine list, craft cocktails, artisan bites, and brunch favorites at Through the Vine Wine Bar in Fort Lauderdale.',
}

export default function MenuPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <p className="section-label mb-4">Explore Our Offerings</p>
          <h1 className="section-heading mb-4" style={{ color: '#F5F0E8' }}>The Menu</h1>
          <p className="text-cream/50 font-sans font-light max-w-2xl mx-auto">
            From curated global wines and craft beer to inventive tapas and indulgent desserts —
            every item tells a story of bold flavors and thoughtful pairings.
          </p>
          <div className="gold-rule w-24 mx-auto mt-6" />
        </div>

        <MenuPageClient />
      </div>
    </div>
  )
}
