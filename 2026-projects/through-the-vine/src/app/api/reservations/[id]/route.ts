import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const { status } = body

  const reservation = await prisma.reservation.update({
    where: { id: params.id },
    data: { status },
  })

  return NextResponse.json(reservation)
}
