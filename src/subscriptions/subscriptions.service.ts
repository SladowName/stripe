import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { StripeService } from '../stripe/stripe.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prismaService: PrismaService,
  ) {}

  public async create(dto: CreateSubscriptionDto) {
    const response = await this.stripeService.stripe.subscriptions.create(dto);

    return this.prismaService.subscription.create({
      data: {
        id: response.id,
        customerId: dto.customer,
        periodStart: new Date(
          response.current_period_start * 1000,
        ).toISOString(),
        periodEnd: new Date(response.current_period_end * 1000).toISOString(),
      },
    });
  }

  public async getById(id: string) {
    const response = await this.stripeService.stripe.subscriptions.retrieve(id);
    console.log(response);
    const invoiceId =
      typeof response.latest_invoice === 'string'
        ? response.latest_invoice
        : response.latest_invoice.id;
    const invoice =
      await this.stripeService.stripe.invoices.retrieve(invoiceId);
    console.log(invoice);
  }
}
