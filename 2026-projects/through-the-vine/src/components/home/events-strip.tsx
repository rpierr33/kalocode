'use client'

import { motion } from 'framer-motion'
import { Wine, Brain, UtensilsCrossed } from 'lucide-react'

const EVENTS = [
  {
    icon: Wine,
    title: 'Happy Hour',
    schedule: 'Wed – Fri, 4–6PM',
    description: '$6 beers, $9 wines, $10 small plates. The perfect way to unwind after work with curated selections at irresistible prices.',
    color: 'from-wine/20 to-transparent',
    borderColor: 'border-wine/30 hover:border-wine/60',
  },
  {
    icon: Brain,
    title: 'Trivia Night',
    schedule: 'Wednesdays, 7–9PM',
    description: 'Test your knowledge over great wine and bites. Gather your team and compete for bragging rights and prizes.',
    color: 'from-glow/10 to-transparent',
    borderColor: 'border-glow/20 hover:border-glow/40',
  },
  {
    icon: UtensilsCrossed,
    title: 'Sunday Brunch',
    schedule: 'Sundays, 12–4PM',
    description: 'Blueberry pancakes, croque madames, and bottomless vibes. Our brunch is the talk of Flagler Village.',
    color: 'from-gold/10 to-transparent',
    borderColor: 'border-gold/20 hover:border-gold/40',
  },
]

export function EventsStrip() {
  return (
    <section className="py-24 bg-wine-gradient relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">What&apos;s Happening</p>
          <h2 className="section-heading" style={{ color: '#F5F0E8' }}>Events & Happenings</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`glass-card rounded-xl p-8 border ${event.borderColor} transition-all duration-300 group cursor-default relative overflow-hidden`}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${event.color} opacity-50`} />

              <div className="relative z-10">
                <event.icon className="w-8 h-8 text-gold mb-6 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-2xl font-serif font-medium mb-2" style={{ color: '#F5F0E8' }}>
                  {event.title}
                </h3>
                <p className="text-xs font-sans uppercase tracking-[0.2em] text-gold/80 mb-4">
                  {event.schedule}
                </p>
                <div className="gold-rule w-12 mb-4" />
                <p className="text-cream/60 font-sans font-light text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
