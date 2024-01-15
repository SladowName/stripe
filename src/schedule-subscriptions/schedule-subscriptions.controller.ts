import { Body, Controller, Post } from '@nestjs/common';
import { ScheduleSubscriptionsService } from './schedule-subscriptions.service';
import { CreateScheduleSubscriptionDto } from './dtos/create-schedule-subscription.dto';

@Controller('schedule-subscriptions')
export class ScheduleSubscriptionsController {
  constructor(private readonly service: ScheduleSubscriptionsService) {}

  @Post()
  create(@Body() dto: CreateScheduleSubscriptionDto) {
    return this.service.create(dto);
  }
}
