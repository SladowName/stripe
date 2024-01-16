import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChargesService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prismaService: PrismaService,
  ) {}

  public async create() {
    const charge = await this.stripeService.stripe.charges.create({
      amount: 10000,
      currency: 'usd',
      customer: 'cus_PNgsWraWO7Wdki',
    });

    console.log(charge);
  }
}
