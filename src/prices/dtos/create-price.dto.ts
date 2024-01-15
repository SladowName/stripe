import { CurrencyEnum } from '../enums/currency.enum';

export class CreatePriceDto {
  currency: CurrencyEnum;
  active: boolean;
  unitAmount: number;
  productId: string;
}
