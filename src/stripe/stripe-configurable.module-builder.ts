import { ConfigurableModuleBuilder } from '@nestjs/common';
import { StripeOptions } from './interfacies/stripe-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<StripeOptions>().build();
