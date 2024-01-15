import { Module } from '@nestjs/common';
import { ScheduleSubscriptionsController } from './schedule-subscriptions.controller';
import { ScheduleSubscriptionsService } from './schedule-subscriptions.service';
import { PrismaService } from '../prisma.service';
import { StripeModule } from '../stripe/stripe.module';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ScheduleSubscriptionsController],
  providers: [ScheduleSubscriptionsService, PrismaService],
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
export class ScheduleSubscriptionsModule {}
