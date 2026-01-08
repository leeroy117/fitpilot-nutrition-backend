import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.users.findMany({
      where: { deleted_at: null },
    });
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({
      where: { id, deleted_at: null },
      include: {
        user_professional_roles: true,
        professional_clients_professional_clients_professional_idTousers: {
          where: { deleted_at: null },
        },
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.users.findFirst({
      where: { email, deleted_at: null },
      include: {
        user_professional_roles: true,
        professional_clients_professional_clients_professional_idTousers: {
          where: { deleted_at: null },
        },
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.users.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
