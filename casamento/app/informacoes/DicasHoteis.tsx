'use client';

export default function DicasHoteis() {
    return (
        <div className="bg-amber-50 p-8 rounded-lg">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Hospedagem Recomendada</h2>
                <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Em desenvolvimento
                </span>
            </div>
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-amber-200 hover:shadow-md transition opacity-50">
                    <h3 className="font-semibold text-gray-900 mb-2">Hotel 5 Estrelas</h3>
                    <p className="text-sm text-gray-600 mb-3">Descrição do hotel</p>
                    <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold text-sm">
                        Ver mais →
                    </a>
                </div>
                <div className="bg-white p-4 rounded-lg border border-amber-200 hover:shadow-md transition opacity-50">
                    <h3 className="font-semibold text-gray-900 mb-2">Hotel 4 Estrelas</h3>
                    <p className="text-sm text-gray-600 mb-3">Descrição do hotel</p>
                    <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold text-sm">
                        Ver mais →
                    </a>
                </div>
                <div className="bg-white p-4 rounded-lg border border-amber-200 hover:shadow-md transition opacity-50">
                    <h3 className="font-semibold text-gray-900 mb-2">Hotel 3 Estrelas</h3>
                    <p className="text-sm text-gray-600 mb-3">Descrição do hotel</p>
                    <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold text-sm">
                        Ver mais →
                    </a>
                </div>
                <div className="bg-white p-4 rounded-lg border border-amber-200 hover:shadow-md transition opacity-50">
                    <h3 className="font-semibold text-gray-900 mb-2">Pousada</h3>
                    <p className="text-sm text-gray-600 mb-3">Descrição da pousada</p>
                    <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold text-sm">
                        Ver mais →
                    </a>
                </div>
            </div>
        </div>
    );
}
