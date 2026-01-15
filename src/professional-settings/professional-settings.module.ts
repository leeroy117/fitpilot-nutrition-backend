import { Module } from '@nestjs/common';
import { ProfessionalSettingsService } from './professional-settings.service';
import { ProfessionalSettingsController } from './professional-settings.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ProfessionalSettingsController],
    providers: [ProfessionalSettingsService],
})
export class ProfessionalSettingsModule { }
