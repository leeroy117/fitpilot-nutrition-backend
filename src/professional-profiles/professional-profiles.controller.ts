import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionalProfilesService } from './professional-profiles.service';
import { CreateProfessionalProfileDto } from './dto/create-professional-profile.dto';
import { UpdateProfessionalProfileDto } from './dto/update-professional-profile.dto';

@Controller('professional-profiles')
export class ProfessionalProfilesController {
  constructor(private readonly professionalProfilesService: ProfessionalProfilesService) {}

  @Post()
  create(@Body() createProfessionalProfileDto: CreateProfessionalProfileDto) {
    return this.professionalProfilesService.create(createProfessionalProfileDto);
  }

  @Get()
  findAll() {
    return this.professionalProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalProfilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionalProfileDto: UpdateProfessionalProfileDto) {
    return this.professionalProfilesService.update(+id, updateProfessionalProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalProfilesService.remove(+id);
  }
}
