import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber, FL_TAX_RATE } from '@/lib/utils'

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(orders)
}

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
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
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
  const orderNumber = generateOrderNumber()

  try {
  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      orderType,
      tableNumber,
      pickupTime,
      specialInstructions,
      subtotal,
      tax,
      total,
      status: 'pending',
      statusHistory: JSON.stringify([
        { status: 'pending', timestamp: new Date().toISOString(), note: 'Order placed' },
      ]),
      items: {
        create: items.map(
          (item: {
            menuItemId: string
            name: string
            price: number
            quantity: number
            variant?: string
            addOns?: { name: string; price: number }[]
          }) => ({
            menuItemId: item.menuItemId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            variant: item.variant || null,
            addOns: JSON.stringify(item.addOns || []),
          })
        ),
      },
    },
    include: { items: true },
  })

  return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Order creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create order. Please try again.' },
      { status: 500 }
    )
  }
}
