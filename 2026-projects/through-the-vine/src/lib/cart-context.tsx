'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { CartItem } from './types'

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { menuItemId: string; variant?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { menuItemId: string; variant?: string; quantity: number } }
  | { type: 'CLEAR_CART' }

function getItemKey(item: { menuItemId: string; variant?: string }): string {
  return `${item.menuItemId}-${item.variant || 'default'}`
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = getItemKey(action.payload)
      const existingIndex = state.items.findIndex(
        (item) => getItemKey(item) === key
      )

      if (existingIndex >= 0) {
        const newItems = [...state.items]
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + action.payload.quantity,
          addOns: action.payload.addOns,
        }
        return { items: newItems }
      }

      return { items: [...state.items, action.payload] }
    }

    case 'REMOVE_ITEM': {
      const key = getItemKey(action.payload)
      return {
        items: state.items.filter((item) => getItemKey(item) !== key),
      }
    }

    case 'UPDATE_QUANTITY': {
      const key = getItemKey(action.payload)
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter((item) => getItemKey(item) !== key),
        }
      }
      return {
        items: state.items.map((item) =>
          getItemKey(item) === key
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
    }

    case 'CLEAR_CART':
      return { items: [] }

    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (menuItemId: string, variant?: string) => void
  updateQuantity: (menuItemId: string, quantity: number, variant?: string) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (menuItemId: string, variant?: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { menuItemId, variant } })
  }

  const updateQuantity = (menuItemId: string, quantity: number, variant?: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { menuItemId, variant, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const subtotal = state.items.reduce((sum, item) => {
    const addOnsTotal = item.addOns.reduce((a, addon) => a + addon.price, 0)
    return sum + (item.price + addOnsTotal) * item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
