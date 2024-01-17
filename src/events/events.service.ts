import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { PrismaService } from '../prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EventsService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prismaService: PrismaService,
  ) {}

  // Перед каждым запуском приложения я бы запускал bootstrap, который бы проверял все не успешные ивенты, также надо помечать последний проверенный
  // чтобы не проверять не сколько раз одинаковые ивенты

  // @Cron(CronExpression.EVERY_30_SECONDS)
  async get() {
    console.log(
      '//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////',
    );
    await this.stripeService.stripe.events
      .list({
        delivery_success: false,
        limit: 1,
        ending_before: 'evt_1OZYocAZTPVM3bpfnVaGblCo',
      })
      .autoPagingEach((event) => {
        console.log(event);
        return;
      });
  }
}
