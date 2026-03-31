'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react'
import { InquiryForm } from './inquiry-form'

export function ContactSection() {
  return (
    <section className="py-24 lg:py-32 bg-wine-gradient relative" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Get in Touch</p>
          <h2 className="section-heading" style={{ color: '#F5F0E8' }}>Find Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Map & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Google Maps */}
            <div className="aspect-video rounded-lg overflow-hidden mb-8 border border-surface-border/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.7!2d-80.1373!3d26.1255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDA3JzMxLjgiTiA4MMKwMDgnMTQuMyJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Through the Vine location"
              />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-wine shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-cream/90 font-sans">444 NE 7th St, Unit 1A</p>
                  <p className="text-sm text-cream/60 font-sans">Fort Lauderdale, FL 33304</p>
                  <p className="text-xs text-gold/60 font-sans mt-1">Inside EON Squared &middot; Flagler Village</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-wine shrink-0 mt-0.5" />
                <div className="text-sm font-sans space-y-1">
                  <p className="text-cream/60">Mon–Tue: Closed</p>
                  <p className="text-cream/60">Wed–Sat: 4PM–12AM</p>
                  <p className="text-cream/60">Sun: 12PM–8PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-wine shrink-0 mt-0.5" />
                <a href="tel:+19545551234" className="text-sm text-cream/60 hover:text-cream transition-colors font-sans">
                  (954) 555-1234
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Instagram size={18} className="text-wine shrink-0 mt-0.5" />
                <a
                  href="https://www.instagram.com/throughthevineftl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/60 hover:text-cream transition-colors font-sans"
                >
                  @throughthevineftl
                </a>
              </div>
            </div>
          </motion.div>

          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <InquiryForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
