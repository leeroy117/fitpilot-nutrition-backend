import { Module } from '@nestjs/common';
import { ProfessionalClientsService } from './professional-clients.service';
import { ProfessionalClientsController } from './professional-clients.controller';

@Module({
  controllers: [ProfessionalClientsController],
  providers: [ProfessionalClientsService],
})
export class ProfessionalClientsModule {}
