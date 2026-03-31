'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, ExternalLink, Truck } from 'lucide-react'

export function OrderSection() {
  return (
    <section className="py-24 bg-wine-gradient-bottom relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Dining Options</p>
          <h2 className="section-heading" style={{ color: '#F5F0E8' }}>Order Your Way</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Order Online */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-xl p-8 text-center border border-wine/30 hover:border-wine/60 transition-all duration-300 group"
          >
            <ShoppingBag className="w-10 h-10 text-wine mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-serif mb-3" style={{ color: '#F5F0E8' }}>Order Online</h3>
            <p className="text-cream/50 text-sm font-sans mb-6">
              Browse our full menu and place your order for dine-in or takeout directly on our site.
            </p>
            <Link
              href="/order"
              className="inline-block px-6 py-2.5 bg-wine text-cream text-sm font-sans uppercase tracking-wider rounded hover:bg-wine-hover transition-all duration-300 btn-glow"
            >
              Order Now
            </Link>
          </motion.div>

          {/* Toast */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card rounded-xl p-8 text-center border border-surface-border hover:border-gold/30 transition-all duration-300 group"
          >
            <ExternalLink className="w-10 h-10 text-gold mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-serif mb-3" style={{ color: '#F5F0E8' }}>Order via Toast</h3>
            <p className="text-cream/50 text-sm font-sans mb-6">
              Prefer our Toast platform? Same great menu, familiar ordering experience.
            </p>
            {/* TODO: Replace with actual Toast URL from client's Toast dashboard */}
            <a
              href="https://www.toasttab.com/through-the-vine"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 border border-gold/40 text-gold text-sm font-sans uppercase tracking-wider rounded hover:bg-gold/10 transition-all duration-300"
            >
              Order on Toast
            </a>
          </motion.div>

          {/* Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-xl p-8 text-center border border-surface-border/50 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-surface-border/50 text-cream/40 text-[10px] font-sans uppercase tracking-wider rounded-full">
                Coming Soon
              </span>
            </div>
            <Truck className="w-10 h-10 text-cream/30 mx-auto mb-6" />
            <h3 className="text-xl font-serif mb-3" style={{ color: 'rgba(245, 240, 232, 0.4)' }}>
              Delivery
            </h3>
            <p className="text-cream/30 text-sm font-sans mb-6">
              Delivery coming soon via DoorDash &amp; Uber Eats. Stay tuned.
            </p>
            <div className="flex items-center justify-center gap-4 opacity-30">
              <span className="text-xs font-sans text-cream/60">DoorDash</span>
              <span className="text-cream/20">|</span>
              <span className="text-xs font-sans text-cream/60">Uber Eats</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
