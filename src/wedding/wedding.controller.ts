import { Controller, Get } from '@nestjs/common';
import { WeddingService } from './wedding.service';

@Controller('wedding')
export class WeddingController {
  constructor(private readonly weddingService: WeddingService) {}

  @Get('info')
  getWeddingInfo() {
    return this.weddingService.getWeddingInfo();
  }

  @Get('location')
  getLocation() {
    return this.weddingService.getLocation();
  }

  @Get('schedule')
  getSchedule() {
    return this.weddingService.getSchedule();
  }
}
