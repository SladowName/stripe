import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentIntentsService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prismaService: PrismaService,
  ) {}

  public async create() {
    const response = await this.stripeService.stripe.paymentIntents.create({
      customer: 'cus_PNgsWraWO7Wdki',
      amount: 20000,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(response);
  }
}
