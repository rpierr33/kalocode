import type { Metadata } from 'next'
import { OrderPageClient } from '@/components/order/order-page-client'

export const metadata: Metadata = {
  title: 'Order Online',
  description: 'Order food and drinks online from Through the Vine Wine Bar. Dine-in or takeout available.',
}

export default function OrderPage() {
  return <OrderPageClient />
}
