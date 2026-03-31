'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { STATUS_COLORS } from '@/lib/types'
import { formatDateTime } from '@/lib/utils'
import { CheckCircle, XCircle, RefreshCw, CalendarDays, Users } from 'lucide-react'

interface Reservation {
  id: string
  name: string
  email: string
  phone?: string
  date: string
  time: string
  partySize: number
  specialNotes?: string
  status: string
  createdAt: string
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReservations = useCallback(async () => {
    try {
      const res = await fetch('/api/reservations')
      const data = await res.json()
      setReservations(data)
    } catch {
      console.error('Failed to fetch reservations')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReservations()
  }, [fetchReservations])

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success(`Reservation ${status}`)
      fetchReservations()
    } catch {
      toast.error('Failed to update reservation')
    }
  }

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
          <h1 className="text-2xl font-serif" style={{ color: '#F5F0E8' }}>Reservations</h1>
          <p className="text-cream/40 text-sm font-sans mt-1">{reservations.length} total reservations</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchReservations} className="gap-2">
          <RefreshCw size={14} /> Refresh
        </Button>
      </div>

      <div className="glass-card rounded-xl border border-surface-border/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Party</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead className="hidden lg:table-cell">Notes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-cream/30 py-12">
                  No reservations yet
                </TableCell>
              </TableRow>
            ) : (
              reservations.map((res) => (
                <TableRow key={res.id}>
                  <TableCell>
                    <p className="font-serif text-sm">{res.name}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <CalendarDays size={14} className="text-gold/60" />
                      <span className="text-cream/70">{res.date} at {res.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Users size={14} className="text-cream/40" />
                      <span>{res.partySize}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-cream/40">
                    <p>{res.email}</p>
                    {res.phone && <p>{res.phone}</p>}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-xs text-cream/40 max-w-[200px] truncate">
                    {res.specialNotes || '—'}
                  </TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLORS[res.status] || ''} variant="outline">
                      {res.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {res.status === 'pending' && (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => updateStatus(res.id, 'confirmed')}
                            className="h-8 w-8 text-green-400"
                            title="Confirm"
                          >
                            <CheckCircle size={14} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => updateStatus(res.id, 'cancelled')}
                            className="h-8 w-8 text-red-400"
                            title="Decline"
                          >
                            <XCircle size={14} />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
