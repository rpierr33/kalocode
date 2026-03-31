'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, ShoppingBag, CalendarDays, MessageSquare, TrendingUp, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatDateTime } from '@/lib/utils'
import { STATUS_COLORS } from '@/lib/types'

interface DashboardData {
  orders: Array<{
    id: string
    orderNumber: string
    customerName: string
    total: number
    status: string
    createdAt: string
    items: Array<{ name: string; quantity: number }>
  }>
  reservations: Array<{
    id: string
    name: string
    date: string
    time: string
    partySize: number
    status: string
  }>
  inquiries: Array<{
    id: string
    name: string
    inquiryType: string
    status: string
    createdAt: string
  }>
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData>({ orders: [], reservations: [], inquiries: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersRes, reservationsRes, inquiriesRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/reservations'),
          fetch('/api/inquiries'),
        ])
        const [orders, reservations, inquiries] = await Promise.all([
          ordersRes.json(),
          reservationsRes.json(),
          inquiriesRes.json(),
        ])
        setData({ orders, reservations, inquiries })
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const todayOrders = data.orders.filter(
    (o) => new Date(o.createdAt).toDateString() === new Date().toDateString()
  )
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0)
  const pendingOrders = data.orders.filter((o) => o.status === 'pending')
  const newInquiries = data.inquiries.filter((o) => o.status === 'new')

  const kpis = [
    { label: "Today's Orders", value: todayOrders.length.toString(), icon: ShoppingBag, color: 'text-wine' },
    { label: "Today's Revenue", value: formatPrice(todayRevenue), icon: DollarSign, color: 'text-gold' },
    { label: 'Pending Orders', value: pendingOrders.length.toString(), icon: Clock, color: 'text-yellow-400' },
    { label: 'New Inquiries', value: newInquiries.length.toString(), icon: MessageSquare, color: 'text-glow' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-wine/30 border-t-wine rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif" style={{ color: '#F5F0E8' }}>Dashboard</h1>
        <p className="text-cream/40 text-sm font-sans mt-1">Welcome back. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="bg-surface/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <kpi.icon size={20} className={kpi.color} />
                  <TrendingUp size={14} className="text-cream/20" />
                </div>
                <p className="text-2xl sm:text-3xl font-serif text-cream">{kpi.value}</p>
                <p className="text-xs font-sans text-cream/40 mt-1 uppercase tracking-wider">{kpi.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="bg-surface/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingBag size={18} className="text-wine" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.orders.length === 0 ? (
              <p className="text-cream/30 text-sm font-sans py-4 text-center">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {data.orders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-surface-border/10"
                  >
                    <div>
                      <p className="text-sm font-serif text-cream">{order.customerName}</p>
                      <p className="text-xs text-cream/40 font-sans">{order.orderNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-serif text-gold">{formatPrice(order.total)}</p>
                      <Badge className={STATUS_COLORS[order.status] || ''} variant="outline">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-surface/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays size={18} className="text-gold" />
              Upcoming Reservations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.reservations.length === 0 ? (
              <p className="text-cream/30 text-sm font-sans py-4 text-center">No reservations yet</p>
            ) : (
              <div className="space-y-3">
                {data.reservations.slice(0, 5).map((res) => (
                  <div
                    key={res.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-surface-border/10"
                  >
                    <div>
                      <p className="text-sm font-serif text-cream">{res.name}</p>
                      <p className="text-xs text-cream/40 font-sans">
                        {res.date} at {res.time} &middot; {res.partySize} guests
                      </p>
                    </div>
                    <Badge className={STATUS_COLORS[res.status] || ''} variant="outline">
                      {res.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
