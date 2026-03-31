'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { CalendarDays, Clock, Users, CheckCircle, ExternalLink } from 'lucide-react'
import Image from 'next/image'

const reservationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  partySize: z.string().min(1, 'Party size is required'),
  specialNotes: z.string().optional(),
})

type ReservationFormData = z.infer<typeof reservationSchema>

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  })

  async function onSubmit(data: ReservationFormData) {
    setLoading(true)
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
      reset()
      toast.success('Reservation request submitted')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-4">Save Your Spot</p>
          <h1 className="section-heading mb-4" style={{ color: '#F5F0E8' }}>Reservations</h1>
          <p className="text-cream/50 font-sans font-light max-w-xl mx-auto">
            Whether it&apos;s date night, a celebration, or an intimate gathering with friends —
            we&apos;ll have your table ready.
          </p>
          <div className="gold-rule w-24 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="glass-card rounded-xl p-12 text-center border border-surface-border/50">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-serif mb-3" style={{ color: '#F5F0E8' }}>
                  Request Received
                </h3>
                <p className="text-cream/60 font-sans text-sm mb-6">
                  We&apos;ll confirm your reservation shortly. Check your email for confirmation.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Make Another Reservation
                </Button>
              </div>
            ) : (
              <div className="glass-card rounded-xl p-8 border border-surface-border/50">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your name" {...register('name')} className="mt-1.5" />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@email.com" {...register('email')} className="mt-1.5" />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" type="tel" placeholder="(555) 555-5555" {...register('phone')} className="mt-1.5" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date" className="flex items-center gap-1.5">
                        <CalendarDays size={14} /> Date
                      </Label>
                      <Input id="date" type="date" {...register('date')} className="mt-1.5" />
                      {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="time" className="flex items-center gap-1.5">
                        <Clock size={14} /> Time
                      </Label>
                      <Select id="time" {...register('time')} className="mt-1.5">
                        <option value="">Select time</option>
                        {['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </Select>
                      {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="partySize" className="flex items-center gap-1.5">
                        <Users size={14} /> Party Size
                      </Label>
                      <Select id="partySize" {...register('partySize')} className="mt-1.5">
                        <option value="">Guests</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                        ))}
                      </Select>
                      {errors.partySize && <p className="text-red-400 text-xs mt-1">{errors.partySize.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialNotes">Special Requests</Label>
                    <Textarea
                      id="specialNotes"
                      placeholder="Birthdays, dietary needs, seating preferences..."
                      rows={3}
                      {...register('specialNotes')}
                      className="mt-1.5"
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full" size="lg">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      'Request Reservation'
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-surface-border/20 text-center">
                  <p className="text-cream/40 text-xs font-sans mb-2">Prefer a different platform?</p>
                  {/* TODO: Replace with actual OpenTable URL */}
                  <a
                    href="https://www.opentable.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold text-sm font-sans hover:text-gold-light transition-colors inline-flex items-center gap-1"
                  >
                    Book on OpenTable <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}
          </motion.div>

          {/* Image + Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/images/throughthevineftl_0016.jpg"
                alt="Through the Vine ambiance"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            <div className="glass-card rounded-xl p-6 border border-surface-border/30 space-y-4">
              <h3 className="font-serif text-lg text-cream">Private Events</h3>
              <p className="text-cream/50 text-sm font-sans leading-relaxed">
                Looking to host a private wine tasting, birthday celebration, or corporate event?
                We offer customized packages for groups of all sizes.
              </p>
              <Button variant="secondary" asChild>
                <a href="/#contact">Inquire About Private Events</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
