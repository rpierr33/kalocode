'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function About() {
  return (
    <section className="py-24 lg:py-32 relative" id="about">
      <div className="ambient-glow" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main About */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-lg overflow-hidden"
          >
            {/* Replaced blurry 0021 with 0030 (table setting with wine, cocktail, flowers) */}
            <Image
              src="/images/throughthevineftl_0030.jpg"
              alt="Wine and cocktails at Through the Vine"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            {/* Secondary logo watermark */}
            <div className="absolute top-6 right-6 w-20 h-20 opacity-60">
              <Image
                src="/images/logo-alt.jpg"
                alt=""
                fill
                className="object-contain rounded-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[11px] font-sans uppercase tracking-[0.35em] mb-4" style={{ color: '#C9A84C' }}>Our Story</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-8" style={{ color: '#F5F0E8' }}>
              Where Every Sip<br />Tells a Story
            </h2>
            <div className="gold-rule w-16 mb-8" />
            <p className="text-cream/70 font-sans font-light leading-relaxed mb-6 text-lg">
              Nestled in the heart of Flagler Village, Through the Vine is Fort Lauderdale&apos;s
              boutique wine bar experience. We pair curated global wines with inventive tapas-style
              bites crafted by Executive Chef Paul Pincus — a seasoned culinary veteran who
              co-created Rivertail Fort Lauderdale alongside 5-time James Beard nominee José Mendín.
            </p>
            <p className="text-cream/50 font-sans font-light leading-relaxed">
              Explore flavors, pairings, and the magic of Through the Vine. Whether you&apos;re here
              for a quiet glass of Burgundy, a lively trivia night, or our legendary Sunday brunch,
              every visit is a journey through the world&apos;s finest vineyards.
            </p>
          </motion.div>
        </div>

        {/* Intro Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <p className="text-[11px] font-sans uppercase tracking-[0.35em] mb-3" style={{ color: '#C9A84C' }}>Step Inside</p>
            <h3 className="text-3xl md:text-4xl font-serif font-light" style={{ color: '#F5F0E8' }}>
              Experience the Vine
            </h3>
          </div>
          <div className="relative max-w-sm mx-auto rounded-xl overflow-hidden border border-surface-border/20 shadow-2xl shadow-wine/5" style={{ aspectRatio: '9/16' }}>
            <video
              controls
              playsInline
              poster="/images/throughthevineftl_0003.jpg"
              className="w-full h-full object-contain bg-black"
            >
              <source src="/videos/intro-vid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        {/* Chef Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:order-2"
          >
            <p className="text-[11px] font-sans uppercase tracking-[0.35em] mb-4" style={{ color: '#C9A84C' }}>The Chef</p>
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6" style={{ color: '#F5F0E8' }}>
              Chef Paul Pincus
            </h2>
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-gold/80 mb-6">
              Executive Chef
            </p>
            <div className="gold-rule w-16 mb-6" />
            <p className="text-cream/70 font-sans font-light leading-relaxed mb-4">
              Born in Queens and raised on Long Island, Chef Paul Pincus brings over a decade
              of corporate culinary experience, having co-created Rivertail Fort Lauderdale alongside
              5-time James Beard nominee José Mendín, and most recently served as Executive Chef at Boatyard.
            </p>
            <p className="text-cream/50 font-sans font-light leading-relaxed">
              His inventive tapas-style menu at Through the Vine is a love letter to bold flavors
              and thoughtful pairings — each dish designed to complement and elevate the wine experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:order-1 relative aspect-[3/4] rounded-lg overflow-hidden"
          >
            <Image
              src="/images/throughthevineftl_0031.jpg"
              alt="Executive Chef Paul Pincus"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
