'use client';

import { CheckCircle, Home, Gift } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function PagamentoConcluídoContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  useEffect(() => {
    // Limpar carrinho após pagamento bem-sucedido
    if (typeof window !== 'undefined' && status === 'success') {
      localStorage.removeItem('cart');
    }
  }, [status]);

  const isSuccess = status === 'success';

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        {isSuccess ? (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 md:p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
                <CheckCircle className="w-16 h-16 text-green-600 relative" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Pagamento Concluído! 🎉
            </h1>

            <div className="mb-8 flex justify-center">
              <Image
                src="/root/agradecimento/image.png"
                alt="Agradecimento"
                width={300}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>

            <p className="text-lg text-gray-600 mb-8">
             Os noivos agradecem sua compra!
            </p>
            <div className="space-y-3 mb-8">
              <p className="text-gray-600">
                Tenha um excelente casamento!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--color-accent-strong)] transition"
              >
                <Home className="w-4 h-4" />
                Voltar ao Início
              </Link>
              <Link
                href="/presentes"
                className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                <Gift className="w-4 h-4" />
                Ver Mais Presentes
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 md:p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">⚠️</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Status Desconhecido
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Não conseguimos determinar o status do seu pagamento.
            </p>

            <p className="text-gray-600 mb-8">
              Por favor, verifique seu email ou entre em contato conosco para maiores informações.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-accent-strong)] transition"
            >
              <Home className="w-4 h-4" />
              Voltar ao Início
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
