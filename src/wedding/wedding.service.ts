import { Injectable } from '@nestjs/common';

@Injectable()
export class WeddingService {
  getWeddingInfo() {
    return {
      bride: 'Nome da Noiva',
      groom: 'Nome do Noivo',
      date: '2026-12-31',
      message: 'Celebre conosco este momento especial!',
    };
  }

  getLocation() {
    return {
      venue: 'Nome do Local',
      address: 'Endereço do Local',
      city: 'Cidade',
      state: 'Estado',
      mapUrl: 'https://maps.google.com',
    };
  }

  getSchedule() {
    return {
      ceremony: '15:00',
      reception: '17:00',
      party: '19:00',
    };
  }
}
