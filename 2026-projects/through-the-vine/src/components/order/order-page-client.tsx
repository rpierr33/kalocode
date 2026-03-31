'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { CartProvider, useCart } from '@/lib/cart-context'
import { ORDER_CATEGORIES, CATEGORY_LABELS } from '@/lib/types'
import { formatPrice, FL_TAX_RATE } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  ShoppingCart, Plus, Minus, Trash2, X, ExternalLink,
  CheckCircle, Clock,
} from 'lucide-react'

interface DbMenuItem {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  imageUrl: string | null
  glassPrice: number | null
  bottlePrice: number | null
  tags: string[]
}

function OrderContent() {
  const [activeCategory, setActiveCategory] = useState('appetizer')
  const [cartOpen, setCartOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState<{ orderNumber: string } | null>(null)
  const [menuItems, setMenuItems] = useState<DbMenuItem[]>([])
  const [menuLoading, setMenuLoading] = useState(true)
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal } = useCart()

  // Fetch menu items from API (with real DB IDs)
  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('/api/menu')
        if (!res.ok) throw new Error('Failed to fetch menu')
        const data = await res.json()
        setMenuItems(data)
      } catch (err) {
        console.error('Failed to load menu:', err)
        toast.error('Failed to load menu items')
      } finally {
        setMenuLoading(false)
      }
    }
    fetchMenu()
  }, [])

  const filteredItems = menuItems.filter((item) => item.category === activeCategory)
  const tax = parseFloat((subtotal * FL_TAX_RATE).toFixed(2))
  const total = subtotal + tax

  function handleAddItem(item: DbMenuItem, variant?: 'glass' | 'bottle') {
    const price = variant === 'glass' && item.glassPrice
      ? item.glassPrice
      : variant === 'bottle' && item.bottlePrice
      ? item.bottlePrice
      : item.price

    addItem({
      menuItemId: item.id,
      name: item.name,
      price,
      quantity: 1,
      variant,
      addOns: [],
      imageUrl: item.imageUrl || undefined,
    })
    toast.success(`${item.name} added to cart`)
  }

  async function handlePlaceOrder(formData: FormData) {
    const customerName = formData.get('customerName') as string
    const customerEmail = formData.get('customerEmail') as string
    const customerPhone = formData.get('customerPhone') as string
    const orderType = formData.get('orderType') as string
    const tableNumber = formData.get('tableNumber') as string
    const pickupTime = formData.get('pickupTime') as string
    const specialInstructions = formData.get('specialInstructions') as string

    if (!customerName || !customerEmail || !customerPhone) {
      toast.error('Please fill in all required fields')
      return
    }

    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          orderType,
          tableNumber: tableNumber || undefined,
          pickupTime: pickupTime || undefined,
          specialInstructions: specialInstructions || undefined,
          items: items.map((item) => ({
            menuItemId: item.menuItemId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            variant: item.variant,
            addOns: item.addOns,
          })),
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData?.error || 'Order failed')
      }

      const order = await res.json()
      setOrderPlaced({ orderNumber: order.orderNumber })
      clearCart()
      setCartOpen(false)
    } catch (err) {
      console.error('Order error:', err)
      toast.error('Failed to place order. Please try again.')
    }
  }

  if (orderPlaced) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-12 text-center max-w-md mx-4 border border-surface-border/50"
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-serif mb-3" style={{ color: '#F5F0E8' }}>Order Confirmed</h2>
          <p className="text-cream/60 font-sans mb-6">Your order has been received and is being prepared.</p>
          <div className="bg-background/50 rounded-lg p-4 mb-6 border border-surface-border/30">
            <p className="text-xs font-sans uppercase tracking-wider text-gold/60 mb-1">Order Number</p>
            <p className="text-2xl font-serif text-gold">{orderPlaced.orderNumber}</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-cream/50 text-sm font-sans mb-8">
            <Clock size={16} />
            <span>Estimated wait: 20–30 minutes</span>
          </div>
          <Button onClick={() => setOrderPlaced(null)}>Place Another Order</Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Toast Banner */}
      <div className="bg-surface border-b border-surface-border/30 py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 text-sm font-sans">
          <span className="text-cream/60">Prefer to order through Toast?</span>
          {/* TODO: Replace with actual Toast URL */}
          <a
            href="https://www.toasttab.com/through-the-vine"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-light transition-colors flex items-center gap-1"
          >
            Order on Toast <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[11px] font-sans uppercase tracking-[0.35em] mb-3" style={{ color: '#C9A84C' }}>Order Online</p>
          <h1 className="text-3xl md:text-4xl font-serif font-light" style={{ color: '#F5F0E8' }}>
            What Are You Craving?
          </h1>
        </div>

        {menuLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-wine/30 border-t-wine rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category sidebar */}
            <div className="lg:w-56 shrink-0">
              <div className="lg:sticky lg:top-24 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                {ORDER_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-xs font-sans uppercase tracking-wider transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-wine text-cream'
                        : 'text-cream/50 hover:text-cream hover:bg-surface'
                    }`}
                  >
                    {CATEGORY_LABELS[cat] || cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredItems.map((item, i) => {
                  const isWine = item.category === 'wine_white' || item.category === 'wine_red'

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      className="glass-card rounded-xl overflow-hidden border border-surface-border/30 flex flex-col"
                    >
                      {item.imageUrl && (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                        </div>
                      )}
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-serif text-base text-cream/95 mb-1">{item.name}</h3>
                        {item.description && (
                          <p className="text-cream/40 text-xs font-sans line-clamp-2 mb-3 flex-1">
                            {item.description}
                          </p>
                        )}
                        <div className="flex items-end justify-between gap-2 mt-auto">
                          <span className="font-serif text-gold text-lg">
                            {isWine && item.glassPrice
                              ? `${formatPrice(item.glassPrice)} / ${formatPrice(item.bottlePrice || item.price)}`
                              : formatPrice(item.price)}
                          </span>
                          {isWine && item.glassPrice ? (
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAddItem(item, 'glass')}
                                className="text-xs"
                              >
                                Glass
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleAddItem(item, 'bottle')}
                                className="text-xs"
                              >
                                Bottle
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleAddItem(item)}
                              className="gap-1"
                            >
                              <Plus size={14} /> Add
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
                {filteredItems.length === 0 && (
                  <p className="text-cream/30 text-sm font-sans col-span-full text-center py-12">
                    No items in this category
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Cart Button — visible on ALL screen sizes */}
      {totalItems > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-wine text-cream rounded-full px-6 py-3 flex items-center gap-2 shadow-lg shadow-wine/20 btn-glow hover:bg-wine-hover transition-all duration-300"
        >
          <ShoppingCart size={18} />
          <span className="font-sans text-sm">{totalItems} items &middot; {formatPrice(subtotal)}</span>
        </button>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-surface border-l border-surface-border z-50 flex flex-col"
            >
              <div className="p-4 border-b border-surface-border/30 flex items-center justify-between">
                <h3 className="font-serif text-lg text-cream">Your Order</h3>
                <button onClick={() => setCartOpen(false)} className="text-cream/50 hover:text-cream">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.length === 0 ? (
                  <p className="text-cream/40 text-sm font-sans text-center py-8">Your cart is empty</p>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.menuItemId}-${item.variant}`}
                      className="flex items-start gap-3 p-3 rounded-lg bg-background/30 border border-surface-border/20"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm text-cream truncate">{item.name}</p>
                        {item.variant && (
                          <Badge variant="outline" className="mt-1 text-[10px]">{item.variant}</Badge>
                        )}
                        <p className="text-gold text-sm font-serif mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.menuItemId, item.quantity - 1, item.variant)}
                          className="w-7 h-7 rounded-full border border-surface-border flex items-center justify-center text-cream/50 hover:text-cream hover:border-wine transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-cream text-sm font-sans w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.menuItemId, item.quantity + 1, item.variant)}
                          className="w-7 h-7 rounded-full border border-surface-border flex items-center justify-center text-cream/50 hover:text-cream hover:border-wine transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.menuItemId, item.variant)}
                          className="text-red-400/50 hover:text-red-400 ml-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-surface-border/30 p-4">
                  <div className="space-y-1 mb-4 text-sm font-sans">
                    <div className="flex justify-between text-cream/60">
                      <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-cream/60">
                      <span>Tax (7%)</span><span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between text-cream font-medium text-base pt-2 border-t border-surface-border/20">
                      <span>Total</span><span className="text-gold">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <form action={handlePlaceOrder} className="space-y-3">
                    <Input name="customerName" placeholder="Your Name *" required />
                    <Input name="customerEmail" type="email" placeholder="Email *" required />
                    <Input name="customerPhone" type="tel" placeholder="Phone *" required />
                    <Select name="orderType" defaultValue="dine_in">
                      <option value="dine_in">Dine-In</option>
                      <option value="takeout">Takeout</option>
                    </Select>
                    <Input name="tableNumber" placeholder="Table number (if dine-in)" />
                    <Input name="pickupTime" placeholder="Pickup time (if takeout)" />
                    <Textarea name="specialInstructions" placeholder="Special instructions..." rows={2} />
                    <Button type="submit" className="w-full" size="lg">
                      Place Order &middot; {formatPrice(total)}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delivery Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-sm border-t border-surface-border/30 py-2.5 z-30 lg:block hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 text-xs font-sans text-cream/40">
          <span>Delivery coming soon via DoorDash &amp; Uber Eats</span>
          <Badge variant="outline" className="text-[10px]">Coming Soon</Badge>
        </div>
      </div>
    </div>
  )
}

export function OrderPageClient() {
  return (
    <CartProvider>
      <OrderContent />
    </CartProvider>
  )
}
