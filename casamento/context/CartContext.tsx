'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCart, Cart, CartItem } from '@/hooks/useCart';

interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'quantidade'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantidade: number) => void;
  clearCart: () => void;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext deve ser usado dentro de CartProvider');
  }
  return context;
}