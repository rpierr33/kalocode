export type MenuCategory =
  | 'wine_white'
  | 'wine_red'
  | 'beer'
  | 'cocktail'
  | 'appetizer'
  | 'salad'
  | 'flatbread'
  | 'handheld'
  | 'dessert'
  | 'soft_drink'
  | 'happy_hour_food'
  | 'happy_hour_drink'

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'ready'
  | 'completed'
  | 'cancelled'
  | 'refunded'

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled'

export type InquiryStatus = 'new' | 'in_progress' | 'resolved'

export type InquiryType =
  | 'general'
  | 'private_event'
  | 'media_press'
  | 'partnership'

export interface CartItem {
  menuItemId: string
  name: string
  price: number
  quantity: number
  variant?: 'glass' | 'bottle'
  addOns: { name: string; price: number }[]
  imageUrl?: string
}

export interface CartState {
  items: CartItem[]
}

export const CATEGORY_LABELS: Record<string, string> = {
  wine_white: 'White Wine',
  wine_red: 'Red Wine',
  beer: 'Beer',
  cocktail: 'Twisted Vines',
  appetizer: 'Appetizers',
  salad: 'Salads',
  flatbread: 'Flatbreads',
  handheld: 'Handhelds',
  dessert: 'Desserts',
  soft_drink: 'Soft Drinks',
  happy_hour_food: 'Happy Hour Food',
  happy_hour_drink: 'Happy Hour Drinks',
}

export const ORDER_CATEGORIES = [
  'appetizer',
  'salad',
  'flatbread',
  'handheld',
  'dessert',
  'cocktail',
  'wine_white',
  'wine_red',
  'beer',
  'soft_drink',
]

export const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  accepted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  ready: 'bg-green-500/20 text-green-400 border-green-500/30',
  completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  refunded: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  new: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  resolved: 'bg-green-500/20 text-green-400 border-green-500/30',
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
}
