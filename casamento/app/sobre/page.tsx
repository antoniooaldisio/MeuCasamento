'use client';

import { Heart } from 'lucide-react';

export default function Sobre() {
  return (
    <section className="w-full py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Heart className="w-8 h-8 text-rose-600" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Sobre Nós</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gradient-to-br from-rose-100 to-pink-100 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Foto do casal aqui</p>
          </div>
          <div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Nossa história é uma jornada de amor e companheirismo. Conhecemos um ao outro em um momento especial e desde então, compartilhamos sonhos e momentos inesquecíveis.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Estamos felizes em convidá-los para celebrar este momento importante conosco, rodeados pelas pessoas que amamos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}