import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';

@Injectable()
export class RefreshTokensService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRefreshTokenDto: CreateRefreshTokenDto) {
    return this.prisma.refresh_tokens.create({
      data: createRefreshTokenDto,
    });
  }

  findAll() {
    return this.prisma.refresh_tokens.findMany();
  }

  findOne(id: number) {
    return this.prisma.refresh_tokens.findUnique({
      where: { id },
    });
  }

  findByToken(token: string) {
    return this.prisma.refresh_tokens.findFirst({
      where: { token },
    });
  }

  removeByUserId(userId: number) {
    return this.prisma.refresh_tokens.deleteMany({
      where: { user_id: userId },
    });
  }

  update(id: number, updateRefreshTokenDto: UpdateRefreshTokenDto) {
    return this.prisma.refresh_tokens.update({
      where: { id },
      data: updateRefreshTokenDto,
    });
  }

  remove(id: number) {
    return this.prisma.refresh_tokens.delete({
      where: { id },
    });
  }
}
