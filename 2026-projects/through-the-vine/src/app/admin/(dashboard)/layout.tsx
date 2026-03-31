'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, ShoppingBag, CalendarDays, MessageSquare,
  UtensilsCrossed, Settings, LogOut, Menu, X
} from 'lucide-react'
import { useState } from 'react'

const SIDEBAR_LINKS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/reservations', label: 'Reservations', icon: CalendarDays },
  { href: '/admin/crm', label: 'Inquiries / CRM', icon: MessageSquare },
  { href: '/admin/menu-mgmt', label: 'Menu Management', icon: UtensilsCrossed, disabled: true },
  { href: '/admin/settings', label: 'Settings', icon: Settings, disabled: true },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface border-r border-surface-border/30 flex flex-col transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-surface-border/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/images/logo.png" alt="TTV" fill className="object-contain" />
            </div>
            <div>
              <p className="text-cream font-serif text-sm">Through the Vine</p>
              <p className="text-[10px] font-sans uppercase tracking-wider text-gold/60">Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.disabled ? '#' : link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans transition-all duration-200',
                  isActive
                    ? 'bg-wine/20 text-cream border border-wine/30'
                    : link.disabled
                    ? 'text-cream/20 cursor-not-allowed'
                    : 'text-cream/50 hover:text-cream hover:bg-background/50'
                )}
              >
                <link.icon size={18} />
                <span>{link.label}</span>
                {link.disabled && (
                  <span className="ml-auto text-[9px] bg-surface-border/50 px-1.5 py-0.5 rounded text-cream/30">Soon</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t border-surface-border/20">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans text-cream/40 hover:text-red-400 transition-colors w-full"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-sans text-cream/30 hover:text-cream/50 transition-colors mt-1"
          >
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <div className="lg:hidden bg-surface border-b border-surface-border/30 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-cream">
            <Menu size={20} />
          </button>
          <span className="text-sm font-serif text-cream">Admin Dashboard</span>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
