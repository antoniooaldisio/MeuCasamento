import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  private gifts = [
    { id: 1, name: 'Lista de Presentes - Item 1', value: 100, available: true },
    { id: 2, name: 'Lista de Presentes - Item 2', value: 200, available: true },
    { id: 3, name: 'Lista de Presentes - Item 3', value: 300, available: true },
  ];

  getGiftList() {
    return {
      gifts: this.gifts,
    };
  }

  processPayment(paymentData: any) {
    // Estrutura básica para integração futura com gateway de pagamento
    return {
      success: true,
      message: 'Pagamento processado com sucesso!',
      transactionId: `TXN-${Date.now()}`,
      data: paymentData,
    };
  }
}
