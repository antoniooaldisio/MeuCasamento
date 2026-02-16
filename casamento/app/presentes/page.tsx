'use client';

import { Gift } from 'lucide-react';

export default function Presentes() {
  return (
    <section className="w-full py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Gift className="w-8 h-8 text-rose-600" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Lista de Presentes</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Nossa Lista de Presentes</h2>
            <p className="text-gray-700 mb-6">
              Para facilitar escolha do presente, criamos uma lista de presentes em:
            </p>
            <button className="bg-rose-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-rose-700 transition">
              Acessar Lista
            </button>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Chave PIX</h2>
            <p className="text-gray-700 mb-6">
              Preferem presentear de outra forma? Podem usar nossa chave PIX:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-gray-600 text-sm">PIX: [sua-chave-pix]</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}