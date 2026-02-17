'use client';

import { Calendar } from 'lucide-react';
import InformacaoLocal from './InformacaoLocal';
import DicasHoteis from './DicasHoteis';
import ConfirmacaoPresenca from './ConfirmacaoPresenca';

export default function Informacoes() {
  return (
    <section className="w-full py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Calendar className="w-8 h-8 text-[var(--color-accent)]" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Informações do Casamento</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda - Informações */}
          <div>
            <InformacaoLocal />
          </div>

          {/* Coluna Central - Dicas de Hotéis */}
          <div>
            <DicasHoteis />
          </div>

          {/* Coluna Direita - Confirmação */}
          <div>
            <ConfirmacaoPresenca />
          </div>
        </div>
      </div>
    </section>
  );
}
