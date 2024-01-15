import { ConfigurableModuleClass } from './stripe-configurable.module-builder';
import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [StripeService],
  exports: [StripeService],
  imports: [ConfigModule],
})
export class StripeModule extends ConfigurableModuleClass {}
