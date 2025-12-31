import { Injectable } from '@nestjs/common';
import { CreateProfessionalProfileDto } from './dto/create-professional-profile.dto';
import { UpdateProfessionalProfileDto } from './dto/update-professional-profile.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfessionalProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProfessionalProfileDto: CreateProfessionalProfileDto) {
    return this.prisma.professional_profiles.create({
      data: createProfessionalProfileDto as any,
    });
  }

  findAll() {
    return this.prisma.professional_profiles.findMany();
  }

  findOne(id: number) {
    return this.prisma.professional_profiles.findUnique({
      where: { user_id: id },
    });
  }

  update(id: number, updateProfessionalProfileDto: UpdateProfessionalProfileDto) {
    return this.prisma.professional_profiles.update({
      where: { user_id: id },
      data: updateProfessionalProfileDto,
    });
  }

  remove(id: number) {
    return this.prisma.professional_profiles.delete({
      where: { user_id: id },
    });
  }
}
