'use client';

import { Heart, Gift, Calendar, Users, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CartIcon } from '@/components/CartIcon';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Antônio & Júlia</title>
      </head>
      <body className="bg-white flex flex-col min-h-screen">
        <CartProvider>
          {/* Navigation Menu */}
          <nav className="bg-white shadow-none z-50 flex-shrink-0">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-[var(--color-accent)]">
              Antônio & Júlia
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              <Link href="/" className="text-gray-700 hover:text-[var(--color-accent)] transition font-medium">Início</Link>
              <Link href="/sobre" className="text-gray-700 hover:text-[var(--color-accent)] transition font-medium">Sobre</Link>
              <Link href="/informacoes" className="text-gray-700 hover:text-[var(--color-accent)] transition font-medium">Informações</Link>
              <Link href="/presentes" className="text-gray-700 hover:text-[var(--color-accent)] transition font-medium">Presentes</Link>
              <Link href="/padrinhos" className="text-gray-700 hover:text-[var(--color-accent)] transition font-medium">Padrinhos</Link>
              <CartIcon />
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4">
              <Link href="/" className="block text-gray-700 hover:text-[var(--color-accent)] transition font-medium" onClick={() => setIsMenuOpen(false)}>Início</Link>
              <Link href="/sobre" className="block text-gray-700 hover:text-[var(--color-accent)] transition font-medium" onClick={() => setIsMenuOpen(false)}>Sobre</Link>
              <Link href="/informacoes" className="block text-gray-700 hover:text-[var(--color-accent)] transition font-medium" onClick={() => setIsMenuOpen(false)}>Informações</Link>
              <Link href="/presentes" className="block text-gray-700 hover:text-[var(--color-accent)] transition font-medium" onClick={() => setIsMenuOpen(false)}>Presentes</Link>
              <Link href="/padrinhos" className="block text-gray-700 hover:text-[var(--color-accent)] transition font-medium" onClick={() => setIsMenuOpen(false)}>Padrinhos</Link>
              <CartIcon />
            </div>
          )}
        </nav>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-lg py-4 px-4 md:px-8 flex-shrink-0 border-t border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-sm">&copy; 2026 Feito pelo Noivo. Todos os direitos reservados.</p>
          </div>
        </footer>
        </CartProvider>
      </body>
    </html>
  );
}
