import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { PrismaService } from '../prisma.service';
import { StripeModule } from '../stripe/stripe.module';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, PrismaService],
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
export class SubscriptionsModule {}
