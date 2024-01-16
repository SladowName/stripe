import { Module } from '@nestjs/common';
import { ChargesController } from './charges.controller';
import { ChargesService } from './charges.service';
import { PrismaService } from '../prisma.service';
import { StripeModule } from '../stripe/stripe.module';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ChargesController],
  providers: [ChargesService, PrismaService],
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
export class ChargesModule {}
