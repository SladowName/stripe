import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { StripeModule } from '../stripe/stripe.module';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
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
export class ProductsModule {}
