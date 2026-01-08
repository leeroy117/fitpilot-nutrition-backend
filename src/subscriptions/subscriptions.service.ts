import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) { }

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.prisma.subscriptions.create({
      data: createSubscriptionDto as any,
    });
  }

  findAll() {
    return this.prisma.subscriptions.findMany({
      where: { deleted_at: null },
    });
  }

  findOne(id: number) {
    return this.prisma.subscriptions.findUnique({
      where: { id, deleted_at: null },
    });
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.prisma.subscriptions.update({
      where: { id },
      data: updateSubscriptionDto,
    });
  }

  remove(id: number) {
    return this.prisma.subscriptions.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
