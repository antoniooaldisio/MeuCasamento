'use client';

import { Suspense } from 'react';
import { PagamentoConcluídoContent } from './PagamentoConcluídoContent';

export default function PagamentoConcluido() {
  return (
    <Suspense fallback={<div className="w-full py-20 px-4 flex items-center justify-center"><p>Carregando...</p></div>}>
      <PagamentoConcluídoContent />
    </Suspense>
  );
}
