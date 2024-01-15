import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { PrismaService } from '../prisma.service';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly stripeService: StripeService,
  ) {}

  public async create(dto: CreateProductDto) {
    const stripeProduct = await this.stripeService.stripe.products.create(dto);
    const dbProduct = await this.prismaService.product.create({
      data: {
        id: stripeProduct.id,
        name: stripeProduct.name,
        description: stripeProduct.description,
        active: stripeProduct.active,
      },
    });

    return dbProduct;
  }
}
