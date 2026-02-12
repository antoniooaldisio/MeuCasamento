import { Module } from '@nestjs/common';
import { WeddingModule } from './wedding/wedding.module';
import { ConfirmationModule } from './confirmation/confirmation.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [WeddingModule, ConfirmationModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
