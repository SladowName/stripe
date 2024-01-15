import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dtos/create-price.dto';
import { PrismaService } from '../prisma.service';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class PricesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly stripeService: StripeService,
  ) {}

  public async create(dto: CreatePriceDto) {
    const stripePrice = await this.stripeService.stripe.prices.create({
      product: dto.productId,
      currency: dto.currency,
      active: dto.active,
      unit_amount: dto.unitAmount,
    });
    const dbPrice = await this.prismaService.price.create({
      data: {
        id: stripePrice.id,
        active: stripePrice.active,
        productId: dto.productId,
        currency: dto.currency,
        unitAmount: stripePrice.unit_amount,
      },
    });

    return dbPrice;
  }
}
