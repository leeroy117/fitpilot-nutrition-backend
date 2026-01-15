import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProfessionalSettingsService } from './professional-settings.service';
import { CreateProfessionalSettingDto } from './dto/create-professional-setting.dto';
import { UpdateProfessionalSettingDto } from './dto/update-professional-setting.dto';

@Controller('professional-settings')
export class ProfessionalSettingsController {
    constructor(private readonly settingsService: ProfessionalSettingsService) { }

    @Post()
    create(@Body() createDto: CreateProfessionalSettingDto) {
        return this.settingsService.create(createDto);
    }

    @Get()
    findAll() {
        return this.settingsService.findAll();
    }

    @Get(':professional_id')
    findOne(@Param('professional_id', ParseIntPipe) id: number) {
        return this.settingsService.findOne(id);
    }

    @Patch(':professional_id')
    update(@Param('professional_id', ParseIntPipe) id: number, @Body() updateDto: UpdateProfessionalSettingDto) {
        return this.settingsService.update(id, updateDto);
    }

    @Delete(':professional_id')
    remove(@Param('professional_id', ParseIntPipe) id: number) {
        return this.settingsService.remove(id);
    }
}
