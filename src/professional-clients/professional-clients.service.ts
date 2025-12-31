import { Injectable } from '@nestjs/common';
import { CreateProfessionalClientDto } from './dto/create-professional-client.dto';
import { UpdateProfessionalClientDto } from './dto/update-professional-client.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfessionalClientsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProfessionalClientDto: CreateProfessionalClientDto) {
    return this.prisma.professional_clients.create({
      data: createProfessionalClientDto as any,
    });
  }

  findAll() {
    return this.prisma.professional_clients.findMany();
  }

  findOne(id: number) {
    return this.prisma.professional_clients.findUnique({
      where: { id },
    });
  }

  update(id: number, updateProfessionalClientDto: UpdateProfessionalClientDto) {
    return this.prisma.professional_clients.update({
      where: { id },
      data: updateProfessionalClientDto,
    });
  }

  remove(id: number) {
    return this.prisma.professional_clients.delete({
      where: { id },
    });
  }
}
