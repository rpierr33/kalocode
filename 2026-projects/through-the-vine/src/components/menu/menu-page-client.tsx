'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Wine, Beer, GlassWater, UtensilsCrossed, Salad, Pizza, Sandwich, Cake, CupSoda, Clock } from 'lucide-react'
import { MENU_DATA } from '@/lib/menu-data'

const TABS = [
  { value: 'appetizer', label: 'Appetizers', icon: UtensilsCrossed },
  { value: 'salad', label: 'Salads', icon: Salad },
  { value: 'flatbread', label: 'Flatbreads', icon: Pizza },
  { value: 'handheld', label: 'Handhelds', icon: Sandwich },
  { value: 'dessert', label: 'Desserts', icon: Cake },
  { value: 'cocktail', label: 'Twisted Vines', icon: GlassWater },
  { value: 'wine_white', label: 'White Wine', icon: Wine },
  { value: 'wine_red', label: 'Red Wine', icon: Wine },
  { value: 'beer', label: 'Beer', icon: Beer },
  { value: 'soft_drink', label: 'Soft Drinks', icon: CupSoda },
  { value: 'happy_hour', label: 'Happy Hour', icon: Clock },
]

export function MenuPageClient() {
  const [activeTab, setActiveTab] = useState('appetizer')

  const filteredItems = activeTab === 'happy_hour'
    ? MENU_DATA.filter((item) => item.tags?.includes('happy_hour'))
    : MENU_DATA.filter((item) => item.category === activeTab)

  const isWineCategory = activeTab === 'wine_white' || activeTab === 'wine_red'
  const isCocktailCategory = activeTab === 'cocktail'

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="justify-center mb-8 bg-surface/50 border border-surface-border/30 p-2 rounded-xl">
        {TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5">
            <tab.icon size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {/* Section title */}
          {isCocktailCategory && tab.value === 'cocktail' && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-gold mb-2">
                Twisted Vines: A Wine-Based Liquor Cocktail Collection
              </h2>
              <p className="text-cream/50 text-sm font-sans">All cocktails $12</p>
            </div>
          )}

          {activeTab === 'happy_hour' && tab.value === 'happy_hour' && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-gold mb-2">Happy Hour Specials</h2>
              <p className="text-cream/50 text-sm font-sans">Wednesday – Friday, 4–6PM</p>
            </div>
          )}

          {isWineCategory ? (
            /* Wine List — elegant text layout */
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-3 items-baseline">
                <div className="text-xs font-sans uppercase tracking-wider text-gold/60 pb-2 border-b border-surface-border/30">
                  Wine
                </div>
                <div className="text-xs font-sans uppercase tracking-wider text-gold/60 pb-2 border-b border-surface-border/30 text-right">
                  Glass
                </div>
                <div className="text-xs font-sans uppercase tracking-wider text-gold/60 pb-2 border-b border-surface-border/30 text-right">
                  Bottle
                </div>
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="contents group"
                  >
                    <div className="py-3 border-b border-surface-border/10 group-hover:border-wine/20 transition-colors">
                      <p className="font-serif text-cream/90 text-base">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-cream/40 font-sans mt-0.5">{item.description}</p>
                      )}
                    </div>
                    <div className="py-3 border-b border-surface-border/10 text-right font-serif text-gold/80 text-sm tabular-nums">
                      {item.glassPrice ? `$${item.glassPrice}` : '—'}
                    </div>
                    <div className="py-3 border-b border-surface-border/10 text-right font-serif text-gold text-sm tabular-nums">
                      {item.bottlePrice ? `$${item.bottlePrice}` : `$${item.price}`}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            /* Food / Beer / Cocktails — card grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass-card rounded-xl overflow-hidden border border-surface-border/30 group"
                >
                  {item.imageUrl && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-serif text-lg text-cream/95">{item.name}</h3>
                      <span className="font-serif text-gold text-lg whitespace-nowrap">
                        ${item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-cream/45 text-sm font-sans font-light leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    {item.tags?.includes('add_prosciutto') && (
                      <p className="text-xs text-gold/60 font-sans mt-2">+ Add Prosciutto $6</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}
