import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService {
  public async create(dto: any) {
    console.log(dto);
  }
}
