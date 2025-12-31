import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExchangeSystemsDto } from './dto/create-exchange-systems.dto';
import { UpdateExchangeSystemsDto } from './dto/update-exchange-systems.dto';

@Injectable()
export class ExchangeSystemsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDto: CreateExchangeSystemsDto) {
    return this.prisma.exchange_systems.create({
      data: createDto,
    });
  }

  findAll() {
    return this.prisma.exchange_systems.findMany();
  }

  findOne(id: number) {
    return this.prisma.exchange_systems.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: UpdateExchangeSystemsDto) {
    return this.prisma.exchange_systems.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.prisma.exchange_systems.delete({
      where: { id },
    });
  }
}
