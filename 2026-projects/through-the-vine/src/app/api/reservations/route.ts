import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(reservations)
}

export async function POST(request: Request) {
  const body = await request.json()

  const { name, email, phone, date, time, partySize, specialNotes } = body

  if (!name || !email || !date || !time || !partySize) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  const reservation = await prisma.reservation.create({
    data: {
      name,
      email,
      phone: phone || null,
      date,
      time,
      partySize: parseInt(partySize),
      specialNotes: specialNotes || null,
    },
  })

  return NextResponse.json(reservation, { status: 201 })
}
