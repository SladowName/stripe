export class CreateSubscriptionDto {
  customer: string;
  items: CreateSubscriptionItem[];
}

export class CreateSubscriptionItem {
  price: string;
  quantity?: number;
}
