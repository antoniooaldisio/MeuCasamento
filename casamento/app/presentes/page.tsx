'use client';

import { Gift, ShoppingCart, Search, Sliders, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartContext } from '@/context/CartContext';

interface Presente {
  id: number;
  nome: string;
  descricao: string;
  valor: string;
  link_da_imagem: string;
  createdAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function Presentes() {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  // Filtros
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Modal estados
  const [showModal, setShowModal] = useState(false);
  const [selectedPresente, setSelectedPresente] = useState<Presente | null>(null);

  const { addToCart } = useCartContext();
  const router = useRouter();

  useEffect(() => {
    const buscarPresentes = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', '12');
        
        if (search) params.append('search', search);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);

        const response = await fetch(`/api/presentes?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Erro ao buscar presentes');
        }

        const dados = await response.json();
        setPresentes(dados.data);
        setPagination(dados.pagination);
      } catch (err) {
        console.error('Erro:', err);
        setErro('Erro ao carregar os presentes');
      } finally {
        setLoading(false);
      }
    };

    buscarPresentes();
  }, [page, search, minPrice, maxPrice]);

  const handleFilterChange = () => {
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    setPage(1);
  };

  const handleAddToCart = (presente: Presente) => {
    setSelectedPresente(presente);
    setShowModal(true);
  };

  const confirmAddToCart = () => {
    if (selectedPresente) {
      addToCart({
        id: selectedPresente.id,
        nome: selectedPresente.nome,
        valor: selectedPresente.valor,
        link_da_imagem: selectedPresente.link_da_imagem,
      });
      setShowModal(false);
      setSelectedPresente(null);
    }
  };

  const goToCart = () => {
    if (selectedPresente) {
      addToCart({
        id: selectedPresente.id,
        nome: selectedPresente.nome,
        valor: selectedPresente.valor,
        link_da_imagem: selectedPresente.link_da_imagem,
      });
      setShowModal(false);
      setSelectedPresente(null);
      router.push('/carrinho');
    }
  };

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Filtros */}
        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition md:hidden"
          >
            <Sliders className="w-4 h-4" />
            Filtrar
          </button>

          <div className={`${showFilters ? 'block' : 'hidden'} md:block bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Busca */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pesquisar</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nome ou descrição..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      handleFilterChange();
                    }}
                    className="w-full px-4 py-2 border-2 border-[var(--color-accent)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-gray-900 placeholder-gray-400"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Preço Mínimo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preço Mínimo</label>
                <input
                  type="number"
                  placeholder="R$ 0"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-4 py-2 border-2 border-[var(--color-accent)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-gray-900 placeholder-gray-400"
                  min="0"
                  step="10"
                />
              </div>

              {/* Preço Máximo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preço Máximo</label>
                <input
                  type="number"
                  placeholder="R$ 10000"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full px-4 py-2 border-2 border-[var(--color-accent)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-gray-900 placeholder-gray-400"
                  min="0"
                  step="10"
                />
              </div>

              {/* Botão Limpar */}
              <div className="flex items-end">
                <button
                  onClick={handleResetFilters}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Presentes */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)] mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando presentes...</p>
            </div>
          </div>
        ) : erro ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-600">⚠️ {erro}</p>
            <p className="text-red-500 text-sm mt-2">Por favor, tente novamente mais tarde</p>
          </div>
        ) : presentes.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
            <Gift className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum presente encontrado com esses filtros</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {presentes.map((presente) => (
                <div key={presente.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Imagem */}
                    <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={presente.link_da_imagem}
                      alt={presente.nome}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22sans-serif%22 fill=%22%23999%22%3EImagem não disponível%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    </div>

                  {/* Conteúdo */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {presente.nome}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {presente.descricao}
                    </p>

                    {/* Valor */}
                    <div className="mb-4 pt-4 border-t border-gray-200">
                      <p className="text-2xl font-bold text-[var(--color-accent)]">
                        R$ {Number(presente.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>

                    {/* Botão */}
                    <button
                      onClick={() => handleAddToCart(presente)}
                      className="w-full bg-[var(--color-accent)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--color-accent-strong)] transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Comprar Presente
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginação */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={!pagination.hasPrevPage}
                  className="px-4 py-2 border-2 border-[var(--color-accent)] text-[var(--color-accent)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-accent)] hover:text-white transition font-semibold"
                >
                  ← Anterior
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-semibold transition ${
                        pageNum === page
                          ? 'bg-[var(--color-accent)] text-white border-2 border-[var(--color-accent)]'
                          : 'border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
                  disabled={!pagination.hasNextPage}
                  className="px-4 py-2 border-2 border-[var(--color-accent)] text-[var(--color-accent)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-accent)] hover:text-white transition font-semibold"
                >
                  Próxima →
                </button>
              </div>
            )}

            {/* Info de paginação */}
            <div className="text-center mt-4 text-gray-600 text-sm">
              Mostrando {presentes.length} de {pagination?.total} presentes (Página {page} de {pagination?.totalPages})
            </div>
          </>
        )}

        {/* Modal de Confirmação */}
        {showModal && selectedPresente && (
          <div className="fixed top-4 right-4 z-50 px-4">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Presente Adicionado! 🎁</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedPresente(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-2">
                <span className="font-semibold">{selectedPresente.nome}</span> foi adicionado ao carrinho!
              </p>
              <p className="text-gray-600 mb-6">
                O que você gostaria de fazer agora?
              </p>

              <div className="space-y-3">
                <button
                  onClick={confirmAddToCart}
                  className="w-full bg-[var(--color-accent)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--color-accent-strong)] transition flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  Continuar Comprando
                </button>
                <button
                  onClick={goToCart}
                  className="w-full bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Ir para o Carrinho
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}