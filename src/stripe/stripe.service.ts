import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { MODULE_OPTIONS_TOKEN } from './stripe-configurable.module-builder';
import { StripeOptions } from './interfacies/stripe-options.interface';

@Injectable()
export class StripeService {
  public readonly stripe: Stripe;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: StripeOptions) {
    this.stripe = new Stripe(this.options.apiKey, this.options.options);
  }
}
