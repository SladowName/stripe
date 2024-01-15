import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Get()
  get() {
    return this.service.get();
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }
}
