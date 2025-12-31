import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExchangeGroupsDto } from './dto/create-exchange-groups.dto';
import { UpdateExchangeGroupsDto } from './dto/update-exchange-groups.dto';

@Injectable()
export class ExchangeGroupsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDto: CreateExchangeGroupsDto) {
    return this.prisma.exchange_groups.create({
      data: createDto,
    });
  }

  findAll() {
    return this.prisma.exchange_groups.findMany();
  }

  findOne(id: number) {
    return this.prisma.exchange_groups.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: UpdateExchangeGroupsDto) {
    return this.prisma.exchange_groups.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prisma.exchange_groups.delete({
      where: { id },
    });
  }
}
