import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const available = searchParams.get('available')

  const where: Record<string, unknown> = {}
  if (category) where.category = category
  if (available !== null) where.available = available !== 'false'

  const items = await prisma.menuItem.findMany({
    where,
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
  })

  return NextResponse.json(items)
}
