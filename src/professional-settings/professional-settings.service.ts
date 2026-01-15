import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfessionalSettingDto } from './dto/create-professional-setting.dto';
import { UpdateProfessionalSettingDto } from './dto/update-professional-setting.dto';

@Injectable()
export class ProfessionalSettingsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createDto: CreateProfessionalSettingDto) {
        return this.prisma.professional_settings.create({
            data: createDto,
        });
    }

    async findAll() {
        return this.prisma.professional_settings.findMany({
            include: {
                exchange_systems: true
            }
        });
    }

    async findOne(id: number) {
        const setting = await this.prisma.professional_settings.findUnique({
            where: { professional_id: id },
            include: {
                exchange_systems: true
            }
        });

        if (!setting) {
            throw new NotFoundException(`Settings for professional ID ${id} not found`);
        }

        return setting;
    }

    async update(id: number, updateDto: UpdateProfessionalSettingDto) {
        // Check if exists
        try {
            await this.findOne(id);
        } catch (error) {
            // If update comes but no record exists, maybe we should create it?
            // For now, standard update behavior: fail if not found.
            // Or we could implement upsert logic if requested. Sticking to update.
            throw error;
        }

        return this.prisma.professional_settings.update({
            where: { professional_id: id },
            data: updateDto,
            include: {
                exchange_systems: true
            }
        });
    }

    async remove(id: number) {
        await this.findOne(id);
        return this.prisma.professional_settings.delete({
            where: { professional_id: id },
        });
    }
}
