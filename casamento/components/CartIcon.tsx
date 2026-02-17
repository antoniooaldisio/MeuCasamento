'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCartContext } from '@/context/CartContext';

export function CartIcon() {
  const { cart, isLoaded } = useCartContext();
  const itemCount = cart.items.length;

  if (!isLoaded) {
    return null;
  }

  return (
    <Link
      href="/carrinho"
      className="relative flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[var(--color-accent)] transition font-medium"
    >
      <ShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
