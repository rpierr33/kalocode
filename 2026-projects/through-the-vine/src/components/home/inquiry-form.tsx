'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Send, CheckCircle } from 'lucide-react'

const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  inquiryType: z.enum(['general', 'private_event', 'media_press', 'partnership']),
})

type InquiryFormData = z.infer<typeof inquirySchema>

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { inquiryType: 'general' },
  })

  async function onSubmit(data: InquiryFormData) {
    setLoading(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to submit')

      setSubmitted(true)
      reset()
      toast.success('Inquiry submitted successfully')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="glass-card rounded-xl p-12 text-center border border-surface-border/50">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-serif mb-3" style={{ color: '#F5F0E8' }}>
          Thank You
        </h3>
        <p className="text-cream/60 font-sans text-sm mb-6">
          We&apos;ve received your inquiry and will get back to you shortly.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send Another Inquiry
        </Button>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-xl p-8 border border-surface-border/50">
      <h3 className="text-xl font-serif mb-2" style={{ color: '#F5F0E8' }}>Send Us a Message</h3>
      <p className="text-cream/50 text-sm font-sans mb-6">
        Private events, press inquiries, or just want to say hello.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" {...register('name')} className="mt-1.5" />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@email.com" {...register('email')} className="mt-1.5" />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" type="tel" placeholder="(555) 555-5555" {...register('phone')} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="inquiryType">Inquiry Type</Label>
            <Select id="inquiryType" {...register('inquiryType')} className="mt-1.5">
              <option value="general">General Inquiry</option>
              <option value="private_event">Private Event</option>
              <option value="media_press">Media / Press</option>
              <option value="partnership">Partnership</option>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Tell us what's on your mind..."
            rows={4}
            {...register('message')}
            className="mt-1.5"
          />
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
        </div>

        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
              Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send size={16} />
              Send Inquiry
            </span>
          )}
        </Button>
      </form>
    </div>
  )
}
