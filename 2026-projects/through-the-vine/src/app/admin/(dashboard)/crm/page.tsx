'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { STATUS_COLORS } from '@/lib/types'
import { formatDateTime } from '@/lib/utils'
import { Eye, RefreshCw, MessageSquare } from 'lucide-react'

interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  inquiryType: string
  status: string
  notes?: string
  createdAt: string
}

const TYPE_LABELS: Record<string, string> = {
  general: 'General',
  private_event: 'Private Event',
  media_press: 'Media/Press',
  partnership: 'Partnership',
}

export default function AdminCRMPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [adminNotes, setAdminNotes] = useState('')

  const fetchInquiries = useCallback(async () => {
    try {
      const res = await fetch('/api/inquiries')
      const data = await res.json()
      setInquiries(data)
    } catch {
      console.error('Failed to fetch inquiries')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInquiries()
  }, [fetchInquiries])

  async function updateInquiry(id: string, status?: string, notes?: string) {
    try {
      const body: Record<string, string> = {}
      if (status) body.status = status
      if (notes !== undefined) body.notes = notes

      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success('Inquiry updated')
      fetchInquiries()
      setSelected(null)
    } catch {
      toast.error('Failed to update inquiry')
    }
  }

  function openInquiry(inquiry: Inquiry) {
    setSelected(inquiry)
    setAdminNotes(inquiry.notes || '')
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
          <h1 className="text-2xl font-serif" style={{ color: '#F5F0E8' }}>Inquiries / CRM</h1>
          <p className="text-cream/40 text-sm font-sans mt-1">{inquiries.length} total inquiries</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchInquiries} className="gap-2">
          <RefreshCw size={14} /> Refresh
        </Button>
      </div>

      <div className="glass-card rounded-xl border border-surface-border/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-cream/30 py-12">
                  No inquiries yet
                </TableCell>
              </TableRow>
            ) : (
              inquiries.map((inq) => (
                <TableRow key={inq.id}>
                  <TableCell className="font-serif text-sm">{inq.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px]">
                      {TYPE_LABELS[inq.inquiryType] || inq.inquiryType}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-cream/40">
                    {inq.email}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-xs text-cream/40 max-w-[250px] truncate">
                    {inq.message}
                  </TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLORS[inq.status] || ''} variant="outline">
                      {inq.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-cream/40">
                    {formatDateTime(inq.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openInquiry(inq)}
                      className="h-8 w-8"
                    >
                      <Eye size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Inquiry Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare size={18} className="text-wine" />
                  {selected.name}
                </DialogTitle>
                <DialogDescription>
                  {TYPE_LABELS[selected.inquiryType] || selected.inquiryType} &middot; {formatDateTime(selected.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-cream/40 text-xs mb-0.5">Email</p>
                    <p className="text-cream text-xs">{selected.email}</p>
                  </div>
                  <div>
                    <p className="text-cream/40 text-xs mb-0.5">Phone</p>
                    <p className="text-cream text-xs">{selected.phone || '—'}</p>
                  </div>
                </div>

                <div className="bg-background/30 rounded-lg p-4 border border-surface-border/20">
                  <p className="text-xs text-cream/40 mb-2">Message</p>
                  <p className="text-sm text-cream/80 leading-relaxed">{selected.message}</p>
                </div>

                <div>
                  <p className="text-xs text-cream/40 mb-2">Admin Notes</p>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add internal notes..."
                    rows={3}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {selected.status === 'new' && (
                    <Button
                      onClick={() => updateInquiry(selected.id, 'in_progress', adminNotes)}
                      size="sm"
                    >
                      Mark In Progress
                    </Button>
                  )}
                  {selected.status !== 'resolved' && (
                    <Button
                      onClick={() => updateInquiry(selected.id, 'resolved', adminNotes)}
                      size="sm"
                      variant="outline"
                    >
                      Mark Resolved
                    </Button>
                  )}
                  {adminNotes !== (selected.notes || '') && (
                    <Button
                      onClick={() => updateInquiry(selected.id, undefined, adminNotes)}
                      size="sm"
                      variant="ghost"
                    >
                      Save Notes
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
