import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('gifts')
  getGiftList() {
    return this.paymentsService.getGiftList();
  }

  @Post('process')
  processPayment(@Body() paymentData: any) {
    return this.paymentsService.processPayment(paymentData);
  }
}
