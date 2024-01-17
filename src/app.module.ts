import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { WebhookModule } from './webhook/webhook.module';
import { ProductsModule } from './products/products.module';
import { PricesModule } from './prices/prices.module';
import { ScheduleSubscriptionsModule } from './schedule-subscriptions/schedule-subscriptions.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { AccountsModule } from './accounts/accounts.module';
import { ChargesModule } from './charges/charges.module';
import { PaymentIntentsModule } from './payment-intents/payment-intents.module';
import { EventsModule } from './events/events.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CustomersModule,
    WebhookModule,
    ProductsModule,
    PricesModule,
    ScheduleSubscriptionsModule,
    SubscriptionsModule,
    AccountsModule,
    ChargesModule,
    PaymentIntentsModule,
    EventsModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
