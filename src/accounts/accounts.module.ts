import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { PrismaService } from '../prisma.service';
import { StripeModule } from '../stripe/stripe.module';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, PrismaService],
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
export class AccountsModule {}
