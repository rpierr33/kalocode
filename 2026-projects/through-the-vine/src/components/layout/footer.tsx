import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t border-surface-border/30">
      {/* Gold rule top accent */}
      <div className="gold-rule" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-24 h-24">
                <Image
                  src="/images/logo.png"
                  alt="Through the Vine"
                  fill
                  className="object-contain drop-shadow-[0_0_12px_rgba(201,168,76,0.15)]"
                />
              </div>
            </div>
            <p className="text-[10px] font-sans uppercase tracking-[0.3em] mb-4" style={{ color: '#C9A84C' }}>
              Wine &middot; Bites &middot; Events
            </p>
            <p className="text-sm text-cream/50 font-sans leading-relaxed">
              Fort Lauderdale&apos;s boutique wine bar experience in the heart of Flagler Village.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-[0.25em] text-gold mb-6">
              Navigate
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Menu' },
                { href: '/order', label: 'Order Online' },
                { href: '/reservations', label: 'Reservations' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-cream/60 hover:text-cream transition-colors duration-200 font-sans"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-[0.25em] text-gold mb-6">
              Hours
            </h4>
            <div className="space-y-2 text-sm font-sans">
              <div className="flex justify-between text-cream/60">
                <span>Mon – Tue</span>
                <span>Closed</span>
              </div>
              <div className="flex justify-between text-cream/60">
                <span>Wed – Fri</span>
                <span>4PM – 12AM</span>
              </div>
              <div className="flex justify-between text-cream/60">
                <span>Saturday</span>
                <span>4PM – 12AM</span>
              </div>
              <div className="flex justify-between text-cream/60">
                <span>Sunday</span>
                <span>12PM – 8PM</span>
              </div>
              <div className="gold-rule my-3" />
              <p className="text-xs text-gold/80">
                Happy Hour: Wed–Fri 4–6PM
              </p>
              <p className="text-xs text-gold/80">
                Brunch: Sundays 12–4PM
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-[0.25em] text-gold mb-6">
              Find Us
            </h4>
            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=444+NE+7th+St+Unit+1A+Fort+Lauderdale+FL+33304"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-cream/60 hover:text-cream transition-colors"
              >
                <MapPin size={16} className="mt-0.5 shrink-0 text-wine" />
                <span>444 NE 7th St, Unit 1A<br />Fort Lauderdale, FL 33304</span>
              </a>
              <a
                href="tel:+19545551234"
                className="flex items-center gap-2 text-sm text-cream/60 hover:text-cream transition-colors"
              >
                <Phone size={16} className="shrink-0 text-wine" />
                <span>(954) 555-1234</span>
              </a>
              <a
                href="mailto:info@throughthevine.com"
                className="flex items-center gap-2 text-sm text-cream/60 hover:text-cream transition-colors"
              >
                <Mail size={16} className="shrink-0 text-wine" />
                <span>info@throughthevine.com</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/throughthevineftl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-gold transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-gold transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-gold transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface-border/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-cream/30 font-sans">
            &copy; {new Date().getFullYear()} Through the Vine Wine Bar. All rights reserved.
          </p>
          <p className="text-xs text-cream/20 font-sans">
            Inside EON Squared &middot; Flagler Village
          </p>
        </div>
      </div>
    </footer>
  )
}
