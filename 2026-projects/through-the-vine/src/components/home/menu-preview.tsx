'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const FEATURED_ITEMS = [
  { name: 'Bruschetta', price: '$15', image: '/images/throughthevineftl_0009.jpg', category: 'Appetizer' },
  { name: 'Blueberry Pancakes', price: '$–', image: '/images/throughthevineftl_0004.jpg', category: 'Brunch' },
  { name: 'Margherita Flatbread', price: '$19', image: '/images/throughthevineftl_0015.jpg', category: 'Flatbread' },
  { name: 'Say Cheese Grilled Cheese', price: '$17', image: '/images/throughthevineftl_0018.jpg', category: 'Handheld' },
  { name: 'Fried Chicken & Cornbread', price: '$–', image: '/images/throughthevineftl_0033.jpg', category: 'Brunch' },
  { name: 'Cheesecake', price: '$12', image: '/images/throughthevineftl_0002.jpg', category: 'Dessert' },
  { name: 'Hummus Dip', price: '$16', image: '/images/throughthevineftl_0024.jpg', category: 'Appetizer' },
  { name: 'Loaded Flatbread', price: '$20', image: '/images/throughthevineftl_0022.jpg', category: 'Flatbread' },
]

export function MenuPreview() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Culinary Craft</p>
          <h2 className="section-heading" style={{ color: '#F5F0E8' }}>The Menu</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {FEATURED_ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold/80 mb-1">
                  {item.category}
                </p>
                <h3 className="text-sm sm:text-base font-serif font-medium text-cream leading-tight">
                  {item.name}
                </h3>
                <p className="text-sm font-serif text-gold mt-1">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/menu"
            className="inline-block px-8 py-3 border border-gold/40 text-gold text-sm font-sans uppercase tracking-[0.15em] rounded hover:bg-gold/10 hover:border-gold transition-all duration-300"
          >
            View Full Menu
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
