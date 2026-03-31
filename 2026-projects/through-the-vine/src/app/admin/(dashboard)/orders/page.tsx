'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { formatPrice, formatDateTime } from '@/lib/utils'
import { STATUS_COLORS } from '@/lib/types'
import {
  CheckCircle, XCircle, Clock, Package, RotateCcw, Eye, RefreshCw,
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  orderType: string
  tableNumber?: string
  pickupTime?: string
  specialInstructions?: string
  subtotal: number
  tax: number
  total: number
  status: string
  statusHistory: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    variant?: string
    addOns: string
  }>
  createdAt: string
}

const STATUS_TABS = ['all', 'pending', 'accepted', 'ready', 'completed', 'cancelled', 'refunded']

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [cancelReason, setCancelReason] = useState('')

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
    } catch {
      console.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 30000)
    return () => clearInterval(interval)
  }, [fetchOrders])

  async function updateOrderStatus(orderId: string, status: string, note?: string) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, note }),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success(`Order marked as ${status}`)
      fetchOrders()
      setSelectedOrder(null)
      setCancelReason('')
    } catch {
      toast.error('Failed to update order')
    }
  }

  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter((o) => o.status === activeTab)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-wine/30 border-t-wine rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif" style={{ color: '#F5F0E8' }}>Orders</h1>
          <p className="text-cream/40 text-sm font-sans mt-1">
            {orders.length} total orders &middot; Auto-refreshes every 30s
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchOrders} className="gap-2">
          <RefreshCw size={14} /> Refresh
        </Button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {STATUS_TABS.map((tab) => {
          const count = tab === 'all' ? orders.length : orders.filter((o) => o.status === tab).length
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-sans uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-wine text-cream'
                  : 'text-cream/40 hover:text-cream hover:bg-surface'
              }`}
            >
              {tab} ({count})
            </button>
          )
        })}
      </div>

      {/* Orders Table */}
      <div className="glass-card rounded-xl border border-surface-border/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-cream/30 py-12">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs text-gold">{order.orderNumber}</TableCell>
                  <TableCell>
                    <p className="font-serif text-sm">{order.customerName}</p>
                    <p className="text-xs text-cream/30">{order.customerPhone}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-cream/50">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </TableCell>
                  <TableCell className="font-serif text-gold">{formatPrice(order.total)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="text-[10px]">
                      {order.orderType === 'dine_in' ? 'Dine-In' : 'Takeout'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLORS[order.status] || ''} variant="outline">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-xs text-cream/40">
                    {formatDateTime(order.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setSelectedOrder(order)}
                        className="h-8 w-8"
                      >
                        <Eye size={14} />
                      </Button>
                      {order.status === 'pending' && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateOrderStatus(order.id, 'accepted')}
                          className="h-8 w-8 text-green-400"
                        >
                          <CheckCircle size={14} />
                        </Button>
                      )}
                      {order.status === 'accepted' && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="h-8 w-8 text-blue-400"
                        >
                          <Package size={14} />
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="h-8 w-8 text-emerald-400"
                        >
                          <CheckCircle size={14} />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order {selectedOrder.orderNumber}</DialogTitle>
                <DialogDescription>
                  Placed {formatDateTime(selectedOrder.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-cream/40 text-xs mb-0.5">Customer</p>
                    <p className="text-cream">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-cream/40 text-xs mb-0.5">Phone</p>
                    <p className="text-cream">{selectedOrder.customerPhone}</p>
                  </div>
                  <div>
                    <p className="text-cream/40 text-xs mb-0.5">Email</p>
                    <p className="text-cream text-xs">{selectedOrder.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-cream/40 text-xs mb-0.5">Type</p>
                    <p className="text-cream">
                      {selectedOrder.orderType === 'dine_in' ? 'Dine-In' : 'Takeout'}
                      {selectedOrder.tableNumber && ` — Table ${selectedOrder.tableNumber}`}
                      {selectedOrder.pickupTime && ` — Pickup: ${selectedOrder.pickupTime}`}
                    </p>
                  </div>
                </div>

                <div className="gold-rule" />

                {/* Items */}
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-cream/80">
                        {item.quantity}x {item.name}
                        {item.variant && <span className="text-cream/40"> ({item.variant})</span>}
                      </span>
                      <span className="text-gold font-serif">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="gold-rule" />
                  <div className="flex justify-between text-sm text-cream/50">
                    <span>Subtotal</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-cream/50">
                    <span>Tax</span>
                    <span>{formatPrice(selectedOrder.tax)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-cream">Total</span>
                    <span className="text-gold font-serif text-lg">{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>

                {selectedOrder.specialInstructions && (
                  <div className="bg-background/30 rounded-lg p-3 border border-surface-border/20">
                    <p className="text-xs text-cream/40 mb-1">Special Instructions</p>
                    <p className="text-sm text-cream/70">{selectedOrder.specialInstructions}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedOrder.status === 'pending' && (
                    <>
                      <Button onClick={() => updateOrderStatus(selectedOrder.id, 'accepted')} className="gap-1">
                        <CheckCircle size={14} /> Accept
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          const reason = cancelReason || 'Cancelled by admin'
                          updateOrderStatus(selectedOrder.id, 'cancelled', reason)
                        }}
                        className="gap-1"
                      >
                        <XCircle size={14} /> Cancel
                      </Button>
                    </>
                  )}
                  {selectedOrder.status === 'accepted' && (
                    <Button onClick={() => updateOrderStatus(selectedOrder.id, 'ready')} className="gap-1">
                      <Package size={14} /> Mark Ready
                    </Button>
                  )}
                  {selectedOrder.status === 'ready' && (
                    <Button onClick={() => updateOrderStatus(selectedOrder.id, 'completed')} className="gap-1">
                      <CheckCircle size={14} /> Complete
                    </Button>
                  )}
                  {['completed', 'cancelled'].includes(selectedOrder.status) && (
                    <Button
                      variant="outline"
                      onClick={() => updateOrderStatus(selectedOrder.id, 'refunded', 'Refund processed')}
                      className="gap-1"
                    >
                      <RotateCcw size={14} /> Mark Refunded
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
