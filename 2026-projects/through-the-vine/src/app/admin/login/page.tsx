'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Wine, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4"
      style={{ background: 'radial-gradient(ellipse at top, #1A0A1A, #0A0A0F)' }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image src="/images/logo.png" alt="Through the Vine" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-serif" style={{ color: '#F5F0E8' }}>Admin Portal</h1>
          <p className="text-cream/40 text-xs font-sans mt-1 uppercase tracking-wider">Through the Vine</p>
        </div>

        <div className="glass-card rounded-xl p-8 border border-surface-border/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@throughthevine.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center font-sans">{error}</p>
            )}

            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock size={16} /> Sign In
                </span>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-cream/20 text-xs font-sans mt-6">
          &copy; {new Date().getFullYear()} Through the Vine Wine Bar
        </p>
      </div>
    </div>
  )
}
