import { Body, Controller, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly service: AccountsService) {}

  @Post()
  create(@Body() dto: CreateAccountDto) {
    return this.service.create(dto);
  }
}
