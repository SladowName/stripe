import { Controller, Post } from '@nestjs/common';
import { ChargesService } from './charges.service';

@Controller('charges')
export class ChargesController {
  constructor(private readonly service: ChargesService) {}

  @Post()
  create() {
    return this.service.create();
  }
}
