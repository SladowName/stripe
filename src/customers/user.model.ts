import { Prisma } from '@prisma/client';

export class UserModel implements Prisma.UserCreateInput {
  id: string;
  email: string;
  name: string;
  password: string;
}
