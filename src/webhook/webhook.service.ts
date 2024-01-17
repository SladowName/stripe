import { Injectable } from '@nestjs/common';
import { ChargeType, InvoiceType, WebhookType } from './types/webhook.type';
import { PrismaService } from '../prisma.service';
import { StripeService } from '../stripe/stripe.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class WebhookService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prismaService: PrismaService,
  ) {}

  public async create(dto: WebhookType) {
    switch (dto.type) {
      case 'invoice.payment_failed':
        await this.updateFailedInvoice(dto);
        return;
      case 'charge.succeeded':
        await this.updateSuccessCharge(dto);
        return;
      case 'invoice.paid':
        await this.updatePaidInvoice(dto);
        return;
      case 'charge.failed':
        await this.updateFailedCharge(dto);
        return;
      default:
        this.exhaustiveCheck(dto);
    }
  }

  private async updateSuccessCharge(dto: ChargeType) {
    const dbCharge = await this.prismaService.charge.findUnique({
      where: {
        id: dto.data.object.id,
      },
    });

    if (!dbCharge) {
      //Если произошла не предвиденная оплата, которая не была зафиксирована у нас в бд. Надо пробрасывать ошибку
      return;
    }

    if (dbCharge.status === $Enums.ChargeStatus.succeeded) {
      //В таком случае если приходит второй вебхук на оплату, я бы оповестил покупателя, а также оповестил тех. поддержку о таком случае.
      return;
    }

    //Обновление
  }

  private async updateFailedCharge(dto: ChargeType) {
    const dbCharge = await this.prismaService.charge.findUnique({
      where: {
        id: dto.data.object.id,
      },
    });

    if (!dbCharge) {
      //Если произошла не предвиденная оплата, которая не была зафиксирована у нас в бд. Надо пробрасывать ошибку
      return;
    }

    if (dbCharge.status === $Enums.ChargeStatus.failed) {
      return;
    }
  }

  private async updatePaidInvoice(dto: InvoiceType) {
    const dbSubscription = await this.prismaService.subscription.findUnique({
      where: {
        id: dto.data.object.subscription,
      },
    });

    if (!dbSubscription) {
      //Если произошла не предвиденная подписка, которая не была зафиксирована у нас в бд. Надо пробрасывать ошибку
      return;
    }

    if (dbSubscription.status === $Enums.SubscriptionStatus.active) {
      //В таком случае если приходит второй вебхук на подписку, я бы оповестил покупателя, а также оповестил тех. поддержку о таком случае.
      return;
    }
  }

  private async updateFailedInvoice(dto: InvoiceType) {
    const dbSubscription = await this.prismaService.subscription.findUnique({
      where: {
        id: dto.data.object.subscription,
      },
    });

    if (!dbSubscription) {
      //Если произошла не предвиденная подписка, которая не была зафиксирована у нас в бд. Надо пробрасывать ошибку
      return;
    }

    if (dbSubscription.status === $Enums.SubscriptionStatus.unpaid) {
      return;
    }
  }

  private exhaustiveCheck(param: never): never {
    throw new Error('Не обработанный веб хук')
  }
}
