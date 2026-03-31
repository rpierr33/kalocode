'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Wine, Brain, UtensilsCrossed, Play, Pause } from 'lucide-react'

export function Hero() {
  const [showBanner, setShowBanner] = useState(true)
  const [videoPlaying, setVideoPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  function toggleVideo() {
    if (!videoRef.current) return
    if (videoPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setVideoPlaying(!videoPlaying)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — video with dark gradient fallback when paused */}
      <div className="absolute inset-0 z-0">
        {/* Dark luxurious gradient base — always visible behind video */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 30% 20%, #1a0a1a 0%, #0A0A0F 50%), radial-gradient(ellipse at 70% 80%, #0f0a18 0%, #0A0A0F 60%)'
        }} />

        {/* Video layer */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoPlaying ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/videos/walk-thru-busy.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Video toggle */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-8 right-8 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-cream/10 flex items-center justify-center text-cream/40 hover:text-cream hover:border-cream/30 transition-all duration-300"
        aria-label={videoPlaying ? 'Pause video' : 'Play video'}
        title={videoPlaying ? 'Pause background video' : 'Play background video'}
      >
        {videoPlaying ? <Pause size={14} /> : <Play size={14} />}
      </button>

      {/* Announcement Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-[70] bg-wine/95 backdrop-blur-md border-b border-gold/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-6 text-cream text-xs sm:text-sm font-sans">
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
                <span className="flex items-center gap-1.5">
                  <Wine size={14} className="text-gold" />
                  Happy Hour: Wed–Fri 4–6PM
                </span>
                <span className="hidden sm:inline text-cream/30">|</span>
                <span className="flex items-center gap-1.5">
                  <Brain size={14} className="text-gold" />
                  Trivia Night: Wednesdays 7PM
                </span>
                <span className="hidden sm:inline text-cream/30">|</span>
                <span className="flex items-center gap-1.5">
                  <UtensilsCrossed size={14} className="text-gold" />
                  Sunday Brunch: 12–4PM
                </span>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-cream/60 hover:text-cream transition-colors shrink-0 ml-2"
                aria-label="Dismiss announcement"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 drop-shadow-[0_0_30px_rgba(201,168,76,0.15)]">
            <Image
              src="/images/logo.png"
              alt="Through the Vine"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.35em] mb-6" style={{ color: '#C9A84C' }}>
            Flagler Village, Fort Lauderdale
          </p>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-serif font-light tracking-tight leading-[0.9] mb-8"
            style={{ color: '#F5F0E8' }}
          >
            Through<br className="sm:hidden" /> the Vine
          </h1>

          <div className="gold-rule w-40 mx-auto mb-6" />

          <p className="text-base sm:text-lg md:text-xl font-sans font-light tracking-[0.15em] mb-4"
            style={{ color: 'rgba(245, 240, 232, 0.7)' }}
          >
            Wine &middot; Bites &middot; Events
          </p>

          <p className="text-sm font-serif italic mb-12 max-w-md mx-auto"
            style={{ color: 'rgba(201, 168, 76, 0.5)' }}
          >
            Where every sip tells a story
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/reservations"
            className="px-10 py-4 border border-gold/50 text-gold text-[11px] font-sans uppercase tracking-[0.2em] rounded-sm hover:bg-gold/10 hover:border-gold transition-all duration-300"
          >
            Reserve a Table
          </Link>
          <Link
            href="/order"
            className="px-10 py-4 bg-wine text-cream text-[11px] font-sans uppercase tracking-[0.2em] rounded-sm hover:bg-wine-hover transition-all duration-300 btn-glow border border-wine-hover/30"
          >
            Order Online
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-cream/30">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/30 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
