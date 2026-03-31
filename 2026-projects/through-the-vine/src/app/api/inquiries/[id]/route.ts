import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const { status, notes } = body

  const data: Record<string, string> = {}
  if (status) data.status = status
  if (notes !== undefined) data.notes = notes

  const inquiry = await prisma.inquiry.update({
    where: { id: params.id },
    data,
  })

  return NextResponse.json(inquiry)
}
