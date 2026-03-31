'use client'

import { motion } from 'framer-motion'

export function VideoShowcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-sans uppercase tracking-[0.35em] mb-4" style={{ color: '#C9A84C' }}>
            Experience the Atmosphere
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light" style={{ color: '#F5F0E8' }}>
            A Taste of the Vine
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Food Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[9/16] md:aspect-[3/4] rounded-xl overflow-hidden border border-surface-border/20 group"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              poster="/images/throughthevineftl_0003.jpg"
            >
              <source src="/videos/foods.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold/80 mb-2">
                From the Kitchen
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif font-light" style={{ color: '#F5F0E8' }}>
                Inventive Bites
              </h3>
              <p className="text-cream/50 text-sm font-sans mt-2 max-w-xs">
                Chef Pincus&apos;s tapas-style creations, designed to elevate every glass.
              </p>
            </div>
          </motion.div>

          {/* Pool / Atmosphere Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative aspect-[9/16] md:aspect-[3/4] rounded-xl overflow-hidden border border-surface-border/20 group"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              poster="/images/throughthevineftl_0008.jpg"
            >
              <source src="/videos/by-the-pool.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold/80 mb-2">
                Poolside Service
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif font-light" style={{ color: '#F5F0E8' }}>
                Sip by the Pool
              </h3>
              <p className="text-cream/50 text-sm font-sans mt-2 max-w-xs">
                Now serving food &amp; drinks poolside at EON Squared.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
