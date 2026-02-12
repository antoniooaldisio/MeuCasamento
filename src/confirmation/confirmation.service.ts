import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfirmationService {
  private confirmations: any[] = [];

  getAllConfirmations() {
    return {
      total: this.confirmations.length,
      confirmations: this.confirmations,
    };
  }

  createConfirmation(confirmationData: any) {
    const confirmation = {
      id: this.confirmations.length + 1,
      ...confirmationData,
      createdAt: new Date(),
    };
    this.confirmations.push(confirmation);
    return {
      success: true,
      message: 'Confirmação registrada com sucesso!',
      data: confirmation,
    };
  }
}
