'use client';

import { Heart, Gift, Calendar, Users, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import './globals.css';

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
        <title>Antonio & Julia</title>
      </head>
      <body className="bg-white">
        {/* Navigation Menu */}
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-rose-600">
              Antonio & Julia
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              <Link href="/" className="text-gray-700 hover:text-rose-600 transition font-medium">Início</Link>
              <Link href="/sobre" className="text-gray-700 hover:text-rose-600 transition font-medium">Sobre</Link>
              <Link href="/informacoes" className="text-gray-700 hover:text-rose-600 transition font-medium">Informações</Link>
              <Link href="/presentes" className="text-gray-700 hover:text-rose-600 transition font-medium">Presentes</Link>
              <Link href="/padrinhos" className="text-gray-700 hover:text-rose-600 transition font-medium">Padrinhos</Link>
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
              <Link href="/" className="block text-gray-700 hover:text-rose-600 transition font-medium" onClick={() => setIsMenuOpen(false)}>Início</Link>
              <Link href="/sobre" className="block text-gray-700 hover:text-rose-600 transition font-medium" onClick={() => setIsMenuOpen(false)}>Sobre</Link>
              <Link href="/informacoes" className="block text-gray-700 hover:text-rose-600 transition font-medium" onClick={() => setIsMenuOpen(false)}>Informações</Link>
              <Link href="/presentes" className="block text-gray-700 hover:text-rose-600 transition font-medium" onClick={() => setIsMenuOpen(false)}>Presentes</Link>
              <Link href="/padrinhos" className="block text-gray-700 hover:text-rose-600 transition font-medium" onClick={() => setIsMenuOpen(false)}>Padrinhos</Link>
            </div>
          )}
        </nav>

        {/* Page Content */}
        <main className="pt-20 min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 md:px-8 mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400">&copy; 2026 Feito pelo Noivo. Todos os direitos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
