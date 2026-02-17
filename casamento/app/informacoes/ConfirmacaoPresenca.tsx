'use client';

import { useState } from 'react';

export default function ConfirmacaoPresenca() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    setLoading(true);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedName.length < 2) {
      setMessage('Informe um nome com pelo menos 2 caracteres.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setMessage('Informe um email válido.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          quantity: Number(quantity),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Erro ao enviar confirmação');
      }

      setMessage('Confirmação enviada com sucesso!');
      setMessageType('success');
      setName('');
      setEmail('');
      setQuantity('1');
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : 'Erro ao enviar confirmação');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirme sua Presença</h3>
      <p className="text-gray-600 mb-6">Por favor, confirme sua presença até <strong>24/06/2026</strong></p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Quantidade de Pessoas</label>
          <input
            type="number"
            min={1}
            max={20}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--color-accent)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[var(--color-accent-strong)] transition disabled:opacity-60"
        >
          {loading ? 'Enviando...' : 'Confirmar Presença'}
        </button>

        {message && (
          <p
            className={`text-sm text-center mt-2 ${
              messageType === 'success' ? 'text-emerald-600' : 'text-[var(--color-accent)]'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
