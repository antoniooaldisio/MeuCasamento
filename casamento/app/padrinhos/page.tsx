'use client';

import { Users } from 'lucide-react';

export default function Padrinhos() {
  return (
    <section className="w-full py-20 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Users className="w-8 h-8 text-[var(--color-accent)]" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Padrinhos</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[var(--color-accent-soft)] p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Padrinhos da Noiva</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <p className="text-gray-400 text-sm">Foto</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">[Nome do Padrinho]</p>
                  <p className="text-gray-600 text-sm">[Parentesco/Relação]</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--color-accent-soft-2)] p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Padrinhos do Noivo</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <p className="text-gray-400 text-sm">Foto</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">[Nome do Padrinho]</p>
                  <p className="text-gray-600 text-sm">[Parentesco/Relação]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}