import { Body, Controller, Post } from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dtos/create-price.dto';

@Controller('prices')
export class PricesController {
  constructor(private readonly service: PricesService) {}

  @Post()
  create(@Body() dto: CreatePriceDto) {
    return this.service.create(dto);
  }
}
