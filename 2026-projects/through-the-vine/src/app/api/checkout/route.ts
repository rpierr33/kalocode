import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { FL_TAX_RATE } from '@/lib/utils'

export async function POST(request: Request) {
  const body = await request.json()

  const {
    customerName,
    customerEmail,
    customerPhone,
    orderType,
    tableNumber,
    pickupTime,
    specialInstructions,
    items,
  } = body

  if (!customerName || !customerEmail || !customerPhone || !items?.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Payment processing is not configured. Please contact the restaurant.' },
      { status: 503 }
    )
  }

  const subtotal = items.reduce(
    (sum: number, item: { price: number; quantity: number; addOns?: { price: number }[] }) => {
      const addOnsTotal = (item.addOns || []).reduce(
        (a: number, addon: { price: number }) => a + addon.price,
        0
      )
      return sum + (item.price + addOnsTotal) * item.quantity
    },
    0
  )

  const tax = parseFloat((subtotal * FL_TAX_RATE).toFixed(2))
  const total = parseFloat((subtotal + tax).toFixed(2))
  const amountInCents = Math.round(total * 100)

  const lineItemsSummary = items
    .map((item: { name: string; quantity: number; variant?: string }) =>
      `${item.quantity}x ${item.name}${item.variant ? ` (${item.variant})` : ''}`
    )
    .join(', ')

  try {
    const stripe = getStripe()
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        customerName,
        customerEmail,
        customerPhone,
        orderType,
        tableNumber: tableNumber || '',
        pickupTime: pickupTime || '',
        specialInstructions: specialInstructions || '',
        items: lineItemsSummary.substring(0, 500),
      },
      receipt_email: customerEmail,
      description: `Through the Vine — ${orderType === 'dine_in' ? 'Dine-In' : 'Takeout'} Order`,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      subtotal,
      tax,
      total,
    })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Payment processing failed. Please try again.' },
      { status: 500 }
    )
  }
}
