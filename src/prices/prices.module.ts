import { Module } from '@nestjs/common';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';
import { ProductsService } from '../products/products.service';
import { PrismaService } from '../prisma.service';
import { StripeModule } from '../stripe/stripe.module';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [PricesController],
  providers: [PricesService, PrismaService],
  imports: [
    StripeModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('STRIPE_API_KEY'),
        options: {
          apiVersion: '2023-10-16',
        },
      }),
    }),
  ],
})
export class PricesModule {}
