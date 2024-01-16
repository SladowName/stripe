import { AccountTypeEnum } from '../enums/account-type.enum';

export class CreateAccountDto {
  type: AccountTypeEnum;
  country: string;
  email: string;
}
