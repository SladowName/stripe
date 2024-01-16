import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';
import { StripeService } from '../stripe/stripe.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prismaService: PrismaService,
  ) {}

  public async create(dto: CreateAccountDto) {
    const response = await this.stripeService.stripe.accounts.create({
      type: dto.type,
      email: dto.email,
      country: dto.country,
      company: {
        address: {
          country: 'US',
        },
        name: 'qwe',
        phone: '(555) 555-1234',
      },
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
      business_type: 'non_profit',
    });

    console.log(response);
  }
}
