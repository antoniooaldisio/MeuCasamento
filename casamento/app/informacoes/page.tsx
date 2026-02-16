'use client';

import { Calendar } from 'lucide-react';

export default function Informacoes() {
  return (
    <section className="w-full py-20 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Calendar className="w-8 h-8 text-rose-600" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Informações do Casamento</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-rose-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cerimônia</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Data:</span> [Data do Casamento]
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Horário:</span> [Horário]
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Local:</span> [Nome do Local]
            </p>
          </div>
          <div className="bg-pink-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recepção</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Data:</span> [Data do Casamento]
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Horário:</span> [Horário]
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Local:</span> [Nome do Local]
            </p>
          </div>
        </div>
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">RSVP</h2>
          <p className="text-gray-700 mb-4">
            Por favor, confirme sua presença até [Data Limite]
          </p>
          <button className="bg-rose-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-700 transition">
            Confirmar Presença
          </button>
        </div>
      </div>
    </section>
  );
}