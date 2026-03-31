'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wine, GlassWater } from 'lucide-react'
import { MENU_DATA } from '@/lib/menu-data'

const WINE_PHOTOS = [
  { src: '/images/throughthevineftl_0019.jpg', alt: 'Ken Wright Cellars Pinot Noir', caption: 'Ken Wright Cellars — Willamette Valley Pinot Noir' },
  { src: '/images/throughthevineftl_0005.jpg', alt: 'Lindemans Framboise Lambic', caption: 'Lindemans Framboise — Belgian Raspberry Lambic' },
  { src: '/images/throughthevineftl_0020.jpg', alt: 'Chimay Grande Réserve', caption: 'Chimay Grande Réserve — Blue Label Trappist Ale' },
  { src: '/images/throughthevineftl_0028.jpg', alt: 'Duvel Belgian Strong Blond', caption: 'Duvel — Belgian Strong Blond' },
  { src: '/images/throughthevineftl_0026.jpg', alt: 'Delirium Tremens', caption: 'Delirium Tremens — Belgian Strong Ale' },
  { src: '/images/throughthevineftl_0013.jpg', alt: 'Stella Artois', caption: 'Stella Artois — Belgian Lager' },
]

const FEATURED_WINES = [
  { name: 'Caymus, Cabernet Sauvignon', region: 'Napa Valley', price: '$185', notes: 'A legendary Napa icon. Rich cassis, dark chocolate, and cedar with a velvety finish that lingers.' },
  { name: 'Louis Latour Chassagne Montrachet', region: 'Burgundy, France', price: '$230', notes: 'Premier Burgundy. Elegant citrus, mineral, and toasted almond with remarkable depth.' },
  { name: 'Far Niente, Chardonnay', region: 'Napa Valley', price: '$140', notes: 'Iconic California Chardonnay. Tropical fruit, vanilla, and crème brûlée with crisp acidity.' },
  { name: 'Massolino Barolo', region: 'Piedmont, Italy', price: '$135', notes: 'Classic Nebbiolo. Rose petals, tar, and dried cherry with firm tannins and endless complexity.' },
  { name: 'Domaine Faiveley Gevrey Chambertain', region: 'Burgundy, France', price: '$178', notes: 'Grand Cru quality. Dark fruit, spice, earth, and a silky structure that defines great Pinot Noir.' },
  { name: 'Viña Vik La Piu Belle', region: 'Chile', price: '$185', notes: 'Carmenère at its finest. Blackberry, smoked herbs, and dark chocolate in perfect balance.' },
]

export function WineShowcaseClient() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'white' | 'red'>('all')

  const whites = MENU_DATA.filter((item) => item.category === 'wine_white')
  const reds = MENU_DATA.filter((item) => item.category === 'wine_red')
  const displayWines = activeFilter === 'white' ? whites : activeFilter === 'red' ? reds : [...whites, ...reds]

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-16">
        <div className="absolute inset-0">
          <Image
            src="/images/throughthevineftl_0019.jpg"
            alt="Wine at Through the Vine"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
        <div className="relative z-10 text-center px-4">
          <Wine className="w-10 h-10 text-gold mx-auto mb-6" />
          <p className="text-[11px] font-sans uppercase tracking-[0.35em] mb-4" style={{ color: '#C9A84C' }}>
            Curated &middot; Global &middot; Exceptional
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-light" style={{ color: '#F5F0E8' }}>
            Our Wine Collection
          </h1>
          <p className="text-cream/50 font-sans font-light mt-6 max-w-lg mx-auto">
            Over 50 wines from the world&apos;s finest regions — Burgundy, Napa, Piedmont,
            Rioja, and beyond. Each bottle hand-selected to pair perfectly with our menu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wine Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <p className="text-[11px] font-sans uppercase tracking-[0.35em] mb-3" style={{ color: '#C9A84C' }}>
              Our Selection
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-light" style={{ color: '#F5F0E8' }}>
              From Vine to Glass
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {WINE_PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-surface-border/20"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-cream text-sm font-serif">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="gold-rule mb-24" />

        {/* Featured / Premium Wines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <p className="text-[11px] font-sans uppercase tracking-[0.35em] mb-3" style={{ color: '#C9A84C' }}>
              Sommelier&apos;s Selection
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-light" style={{ color: '#F5F0E8' }}>
              Featured Bottles
            </h2>
            <p className="text-cream/40 text-sm font-sans mt-3 max-w-md mx-auto">
              Our most sought-after bottles, each with a story worth savoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_WINES.map((wine, i) => (
              <motion.div
                key={wine.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-xl p-6 border border-surface-border/30 hover:border-gold/20 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <GlassWater size={20} className="text-wine/60 group-hover:text-wine transition-colors" />
                  <span className="text-xl font-serif text-gold">{wine.price}</span>
                </div>
                <h3 className="font-serif text-lg text-cream mb-1">{wine.name}</h3>
                <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold/50 mb-4">{wine.region}</p>
                <div className="gold-rule w-10 mb-4" />
                <p className="text-cream/45 text-sm font-sans font-light leading-relaxed italic">
                  {wine.notes}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="gold-rule mb-24" />

        {/* Full Wine List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <p className="text-[11px] font-sans uppercase tracking-[0.35em] mb-3" style={{ color: '#C9A84C' }}>
              Complete List
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-light" style={{ color: '#F5F0E8' }}>
              The Wine List
            </h2>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-3 mb-10">
            {[
              { key: 'all' as const, label: 'All Wines' },
              { key: 'white' as const, label: 'White Wines' },
              { key: 'red' as const, label: 'Red Wines' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2 rounded-sm text-xs font-sans uppercase tracking-wider transition-all duration-200 ${
                  activeFilter === filter.key
                    ? 'bg-wine text-cream'
                    : 'text-cream/40 hover:text-cream border border-surface-border/30 hover:border-cream/20'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Wine table */}
          <div className="max-w-3xl mx-auto mb-16">
            {activeFilter !== 'red' && (
              <>
                <h3 className="text-lg font-serif text-gold mb-4 flex items-center gap-2">
                  <Wine size={18} /> White Wines
                </h3>
                <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-0 mb-10">
                  <div className="text-[10px] font-sans uppercase tracking-wider text-gold/40 pb-2 border-b border-surface-border/20">Wine</div>
                  <div className="text-[10px] font-sans uppercase tracking-wider text-gold/40 pb-2 border-b border-surface-border/20 text-right">Glass</div>
                  <div className="text-[10px] font-sans uppercase tracking-wider text-gold/40 pb-2 border-b border-surface-border/20 text-right">Bottle</div>
                  {whites.map((wine) => (
                    <div key={wine.name} className="contents group">
                      <div className="py-2.5 border-b border-surface-border/10 group-hover:border-wine/20 transition-colors">
                        <p className="font-serif text-cream/85 text-sm">{wine.name}</p>
                      </div>
                      <div className="py-2.5 border-b border-surface-border/10 text-right font-serif text-gold/70 text-sm tabular-nums">
                        {wine.glassPrice ? `$${wine.glassPrice}` : '—'}
                      </div>
                      <div className="py-2.5 border-b border-surface-border/10 text-right font-serif text-gold text-sm tabular-nums">
                        {wine.bottlePrice ? `$${wine.bottlePrice}` : wine.price ? `$${wine.price}` : '—'}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeFilter !== 'white' && (
              <>
                <h3 className="text-lg font-serif text-gold mb-4 flex items-center gap-2">
                  <Wine size={18} /> Red Wines
                </h3>
                <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-0">
                  <div className="text-[10px] font-sans uppercase tracking-wider text-gold/40 pb-2 border-b border-surface-border/20">Wine</div>
                  <div className="text-[10px] font-sans uppercase tracking-wider text-gold/40 pb-2 border-b border-surface-border/20 text-right">Glass</div>
                  <div className="text-[10px] font-sans uppercase tracking-wider text-gold/40 pb-2 border-b border-surface-border/20 text-right">Bottle</div>
                  {reds.map((wine) => (
                    <div key={wine.name} className="contents group">
                      <div className="py-2.5 border-b border-surface-border/10 group-hover:border-wine/20 transition-colors">
                        <p className="font-serif text-cream/85 text-sm">{wine.name}</p>
                      </div>
                      <div className="py-2.5 border-b border-surface-border/10 text-right font-serif text-gold/70 text-sm tabular-nums">
                        {wine.glassPrice ? `$${wine.glassPrice}` : '—'}
                      </div>
                      <div className="py-2.5 border-b border-surface-border/10 text-right font-serif text-gold text-sm tabular-nums">
                        {wine.bottlePrice ? `$${wine.bottlePrice}` : wine.price ? `$${wine.price}` : '—'}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* CTA */}
          <div className="text-center pb-8">
            <p className="text-cream/40 text-sm font-sans mb-4">
              Can&apos;t decide? Our staff will guide you to the perfect pairing.
            </p>
            <Link
              href="/reservations"
              className="inline-block px-8 py-3 border border-gold/40 text-gold text-[11px] font-sans uppercase tracking-[0.15em] rounded-sm hover:bg-gold/10 hover:border-gold transition-all duration-300"
            >
              Reserve Your Table
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
