import { Stripe } from 'stripe';

export class CreateScheduleSubscriptionDto {
  customerId: string;
  startDate: string;
  endBehavior: Stripe.SubscriptionScheduleCreateParams.EndBehavior;
  phases: CreatePhasesDto[];
}

export class CreatePhasesDto {
  items: CreatePhasesItemsDto[];
  iterations: number;
}

export class CreatePhasesItemsDto {
  price: string;
  quantity: number;
}
