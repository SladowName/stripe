import { Injectable } from '@nestjs/common';
import { CreateScheduleSubscriptionDto } from './dtos/create-schedule-subscription.dto';
import { StripeService } from '../stripe/stripe.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ScheduleSubscriptionsService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prismaService: PrismaService,
  ) {}

  public async create(dto: CreateScheduleSubscriptionDto) {
    const stripeScheduleSubscription =
      await this.stripeService.stripe.subscriptionSchedules.create({
        customer: dto.customerId,
        start_date: 'now',
        end_behavior: 'cancel',
        phases: dto.phases,
      });

    const dbScheduleSubscription =
      await this.prismaService.subscriptionSchedule.create({
        data: {
          id: stripeScheduleSubscription.id,
          endBehavior: 'release',
          customerId: dto.customerId,
          startDate: new Date().toISOString(),
        },
      });

    return dbScheduleSubscription;
  }
}
