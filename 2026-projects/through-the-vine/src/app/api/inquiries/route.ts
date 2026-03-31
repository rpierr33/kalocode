import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(inquiries)
}

export async function POST(request: Request) {
  const body = await request.json()

  const { name, email, phone, message, inquiryType } = body

  if (!name || !email || !message || !inquiryType) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      name,
      email,
      phone: phone || null,
      message,
      inquiryType,
    },
  })

  return NextResponse.json(inquiry, { status: 201 })
}
