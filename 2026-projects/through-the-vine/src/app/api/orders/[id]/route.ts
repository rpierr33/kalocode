import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: { include: { menuItem: true } } },
  })

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  return NextResponse.json(order)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const { status, note } = body

  const order = await prisma.order.findUnique({
    where: { id: params.id },
  })

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  const currentHistory = typeof order.statusHistory === 'string'
    ? JSON.parse(order.statusHistory)
    : order.statusHistory

  const updatedHistory = [
    ...(Array.isArray(currentHistory) ? currentHistory : []),
    {
      status,
      timestamp: new Date().toISOString(),
      note: note || `Status changed to ${status}`,
    },
  ]

  const updatedOrder = await prisma.order.update({
    where: { id: params.id },
    data: {
      status,
      statusHistory: JSON.stringify(updatedHistory),
    },
    include: { items: true },
  })

  return NextResponse.json(updatedOrder)
}
