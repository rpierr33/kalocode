'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Wine } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/wines', label: 'Wines' },
  { href: '/menu', label: 'Menu' },
  { href: '/order', label: 'Order' },
  { href: '/reservations', label: 'Reservations' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isAdmin = pathname?.startsWith('/admin')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isAdmin) return null

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'top-0 bg-background/95 backdrop-blur-xl border-b border-surface-border/50 py-2'
          : 'top-[44px] bg-black/20 backdrop-blur-sm py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo — larger, prominent */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className={cn(
              'relative transition-all duration-500 group-hover:scale-105',
              scrolled ? 'w-14 h-14' : 'w-20 h-20'
            )}>
              <Image
                src="/images/logo.png"
                alt="Through the Vine"
                fill
                className="object-contain drop-shadow-[0_0_12px_rgba(201,168,76,0.2)]"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className={cn(
                'text-cream font-serif tracking-wide transition-all duration-300',
                scrolled ? 'text-lg' : 'text-xl'
              )}>
                Through the Vine
              </span>
              <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-gold/60">
                Wine Bar &middot; Flagler Village
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-[11px] font-sans uppercase tracking-[0.2em] transition-all duration-300 relative py-1',
                  pathname === link.href
                    ? 'text-gold'
                    : 'text-cream/70 hover:text-cream'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold" />
                )}
              </Link>
            ))}
            <Link
              href="/order"
              className="ml-4 px-6 py-2.5 bg-wine text-cream text-[11px] font-sans uppercase tracking-[0.15em] rounded-sm hover:bg-wine-hover transition-all duration-300 btn-glow border border-wine-hover/30"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cream p-2"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-0 top-0 bg-background/98 backdrop-blur-xl transition-all duration-300 z-40',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="absolute top-4 right-4">
          <button onClick={() => setIsOpen(false)} className="text-cream p-2">
            <X size={28} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
          <div className="relative w-24 h-24 mb-4">
            <Image src="/images/logo.png" alt="Through the Vine" fill className="object-contain" />
          </div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'text-2xl font-serif tracking-wide transition-colors duration-300',
                pathname === link.href ? 'text-gold' : 'text-cream/80 hover:text-cream'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="gold-rule w-24 my-2" />
          <Link
            href="/order"
            onClick={() => setIsOpen(false)}
            className="px-8 py-3 bg-wine text-cream font-sans uppercase tracking-wider rounded hover:bg-wine-hover transition-all duration-300"
          >
            Order Now
          </Link>
        </div>
      </div>
    </nav>
  )
}
