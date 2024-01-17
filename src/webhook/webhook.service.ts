import { Injectable } from '@nestjs/common';
import { ChargeType, InvoiceType, WebhookType } from './types/webhook.type';
import { PrismaService } from '../prisma.service';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prismaService: PrismaService,
  ) {}

  public async create(dto: WebhookType) {
    // Все запросы в stripe можно сделать идемпотентыми, благодаря этому можно понять был ли принят данный ивент
    // также можно проверять по id events
    // Я бы использовал какой-нибудь кеш на подобии редиса, для того чтобы хранить все id ивентов которые приняли,
    // Установил бы очищение раз в час, чтобы убирать уже проверянные ивенты и которые уже не придут, возможно даже чаще
    // чтобы не переполнять кеш, и хранить его в актуальном состоянии. Однако это все ещё без фактических расчетов и учета
    // rps и количества информации которой придется хранить. Так мы избавимся от проверки на дубликат в базе данных, что
    // очень сильно облегчит ей жизнь.

    // Тут должно происходить обновление статусов оплат и подписок, также передача наших данных дальше во внешние базы данных и сервисы.

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
    this.prismaService.charge.update({
      data: {
        status: 'succeeded',
      },
      where: {
        id: dto.data.object.charge,
      },
    });
  }

  private async updateFailedCharge(dto: ChargeType) {
    this.prismaService.charge.update({
      data: {
        status: 'failed',
      },
      where: {
        id: dto.data.object.charge,
      },
    });
  }

  private async updatePaidInvoice(dto: InvoiceType) {
    this.prismaService.subscription.update({
      data: {
        status: 'active',
      },
      where: {
        id: dto.data.object.subscription,
      },
    });
  }

  private async updateFailedInvoice(dto: InvoiceType) {
    this.prismaService.subscription.update({
      data: {
        status: 'incomplete',
      },
      where: {
        id: dto.data.object.subscription,
      },
    });
  }

  private exhaustiveCheck(_: never): never {
    throw new Error('Не обработанный веб хук');
  }
}
