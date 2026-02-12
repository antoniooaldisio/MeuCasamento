import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConfirmationService } from './confirmation.service';

@Controller('confirmation')
export class ConfirmationController {
  constructor(private readonly confirmationService: ConfirmationService) {}

  @Get()
  getAllConfirmations() {
    return this.confirmationService.getAllConfirmations();
  }

  @Post()
  createConfirmation(@Body() confirmationData: any) {
    return this.confirmationService.createConfirmation(confirmationData);
  }
}
