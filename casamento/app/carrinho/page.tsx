'use client';

import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Loader } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCartContext } from '@/context/CartContext';

export default function Carrinho() {
  const { cart, removeFromCart, updateQuantity, clearCart, isLoaded } = useCartContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      setError('');

      const payload = {
        items: cart.items,
      };

      console.log('Enviando checkout para backend:', payload);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar pagamento');
      }

      const data = await response.json();
      console.log('Resposta do checkout:', data);

      // Redirecionar para a URL de checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de checkout não encontrada');
      }
    } catch (err) {
      console.error('Erro no checkout:', err);
      setError(err instanceof Error ? err.message : 'Erro ao processar o pagamento');
      setIsProcessing(false);
    }
  };

  if (!isLoaded) {
    return (
      <section className="w-full py-20 px-4 md:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)] mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando carrinho...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-8">
          <Link
            href="/presentes"
            className="flex items-center gap-2 text-[var(--color-accent)] hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos presentes
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="w-8 h-8" />
            Carrinho de Compras
          </h1>
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Seu carrinho está vazio</p>
            <Link
              href="/presentes"
              className="inline-block bg-[var(--color-accent)] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[var(--color-accent-strong)] transition"
            >
              Continuar comprando
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Itens do Carrinho */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 last:border-b-0 p-6 flex gap-6"
                  >
                    {/* Imagem */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.link_da_imagem}
                        alt={item.nome}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22sans-serif%22 fill=%22%23999%22%3EImagem não disponível%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>

                    {/* Informações */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-900 mb-2">{item.nome}</h3>
                      <p className="text-lg font-bold text-[var(--color-accent)] mb-4">
                        R$ {Number(item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>

                      {/* Controles de quantidade */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-50 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantidade}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-50 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal e Remover */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-2">
                        Subtotal:
                      </p>
                      <p className="font-bold text-gray-900 mb-4">
                        R$ {(Number(item.valor) * item.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 transition flex items-center gap-1 ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão Limpar Carrinho */}
              <button
                onClick={clearCart}
                className="mt-4 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition font-semibold"
              >
                Limpar Carrinho
              </button>
            </div>

            {/* Resumo */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Resumo do Pedido</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>
                      R$ {cart.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete:</span>
                    <span>Grátis</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-[var(--color-accent)]">
                      R$ {cart.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {cart.items.length} {cart.items.length === 1 ? 'item' : 'itens'}
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-[var(--color-accent)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--color-accent-strong)] transition mb-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    'Finalizar Compra'
                  )}
                </button>

                <Link
                  href="/presentes"
                  className="block text-center text-[var(--color-accent)] hover:underline text-sm font-semibold"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}