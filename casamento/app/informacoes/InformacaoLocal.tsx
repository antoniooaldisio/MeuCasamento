'use client';

export default function InformacaoLocal() {
  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Local do Casamento</h2>
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Data:</span> 04/07/2026
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Horário:</span> 16:00 - 00:00
          </p>
        </div>
        <div className="pt-4 border-t border-[var(--color-accent-soft-2)]">
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Local:</span> Naturalle
          </p>
          <p className="text-gray-700 mb-4 text-sm">
            <span className="font-semibold">Endereço:</span> Rua Santa Catarina, 935, chácara 7, Vila Jardim São Judas Tadeu, Goiânia, Brazil 74685-440
          </p>
        </div>
      </div>
      <a 
        href="https://www.google.com/maps/place/Naturalle+Eventos/@-15.789177884642255,-48.27636732346921,15z" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[var(--color-accent)] text-white px-6 py-2 rounded-full font-semibold hover:bg-[var(--color-accent-strong)] transition mb-6"
      >
        Ver no Mapa →
      </a>
      <div className="w-full h-80 rounded-lg overflow-hidden border-2 border-[var(--color-accent-soft-2)]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.8975453847826!2d-48.27636732346921!3d-15.789177884642255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b7f5f5f5f5f5f5%3A0x73bceae26aa4fa7a!2sNaturalle%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={undefined}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
