'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  {
    text: 'The best wine bar in Fort Lauderdale. The ambiance is incredible and the staff truly knows their wines. Every recommendation was spot on.',
    author: 'Sarah M.',
    source: 'Google Review',
  },
  {
    text: 'Hidden gem in Flagler Village! The charcuterie board is a work of art, and their wine-based cocktails are so creative. Can\'t stop coming back.',
    author: 'James R.',
    source: 'Google Review',
  },
  {
    text: 'Sunday brunch here is unreal. The blueberry pancakes, the atmosphere, the mimosas — everything is perfect. This is our new go-to spot.',
    author: 'Michael & Lisa',
    source: 'Google Review',
  },
]

export function Testimonials() {
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
          <p className="section-label mb-4">Guest Experiences</p>
          <h2 className="section-heading" style={{ color: '#F5F0E8' }}>What They&apos;re Saying</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card rounded-xl p-8 border border-surface-border/50"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-gold text-gold" />
                ))}
              </div>

              <p className="text-cream/70 font-sans font-light italic leading-relaxed mb-6 text-sm">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="gold-rule w-10 mb-4" />

              <p className="text-cream/90 font-serif text-sm">{review.author}</p>
              <p className="text-xs text-muted-foreground font-sans">{review.source}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
