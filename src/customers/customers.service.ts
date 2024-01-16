import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prismaService: PrismaService,
  ) {}

  public async get() {
    return this.stripeService.stripe.customers.list();
  }

  async create({ email, name, password }: CreateUserDto) {
    const user = await this.getByEmail(email);

    if (user) {
      throw new HttpException(
        { message: 'User with email exist' },
        HttpStatus.BAD_REQUEST,
      );
    }

    //TODO check duplicate customer in stripe
    //TODO metadata

    const response = await this.stripeService.stripe.customers.create({
      email: email,
      name: name,
    });

    return this.prismaService.user.create({
      data: {
        id: response.id,
        email,
        name,
        password,
      },
    });
  }

  public async getByEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }
}
