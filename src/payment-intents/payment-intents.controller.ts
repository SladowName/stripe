import { Controller, Post } from '@nestjs/common';
import { PaymentIntentsService } from './payment-intents.service';

@Controller('payment-intents')
export class PaymentIntentsController {
  constructor(private readonly service: PaymentIntentsService) {}

  @Post()
  create() {
    return this.service.create();
  }
}
