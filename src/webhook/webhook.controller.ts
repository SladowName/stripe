import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly service: WebhookService) {}

  //TODO charge.succed, charge.failed, invoice.paid, invoice.failed,

  @Post()
  create(@Body() dto: any) {
    return this.service.create(dto);
  }
}
