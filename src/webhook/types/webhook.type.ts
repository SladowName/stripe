export type WebhookType = {
  id: string;
  object: string;
  api_version: string;
} & (ChargeType | InvoiceType);

export type ChargeType = {
  data: {
    object: {
      id: string;
      amount: number;
      invoice: string;
      metadata: {
        [key in string]: string;
      };
      paid: boolean;
      customer: string;
    };
  };
  type: 'charge.succeeded' | 'charge.failed';
};

export type InvoiceType = {
  data: {
    object: {
      id: string;
      subtotal: number;
      total: number;
      metadata: {
        [key in string]: string;
      };
      paid: boolean;
      customer: string;
      subscription: string;
    };
  };
  type: 'invoice.paid' | 'invoice.payment_failed';
};
