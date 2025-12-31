import { Module } from '@nestjs/common';
import { ProfessionalProfilesService } from './professional-profiles.service';
import { ProfessionalProfilesController } from './professional-profiles.controller';

@Module({
  controllers: [ProfessionalProfilesController],
  providers: [ProfessionalProfilesService],
})
export class ProfessionalProfilesModule {}
