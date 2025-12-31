import { Module } from '@nestjs/common';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshTokensController } from './refresh-tokens.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RefreshTokensController],
  providers: [RefreshTokensService],
  exports: [RefreshTokensService],
})
export class RefreshTokensModule {}
