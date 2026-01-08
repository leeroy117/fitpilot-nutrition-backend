import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionalClientsService } from './professional-clients.service';
import { CreateProfessionalClientDto } from './dto/create-professional-client.dto';
import { UpdateProfessionalClientDto } from './dto/update-professional-client.dto';

@Controller('professional-clients')
export class ProfessionalClientsController {
  constructor(private readonly professionalClientsService: ProfessionalClientsService) { }

  @Post()
  create(@Body() createProfessionalClientDto: CreateProfessionalClientDto) {
    return this.professionalClientsService.create(createProfessionalClientDto);
  }

  @Get()
  findAll() {
    return this.professionalClientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalClientsService.findOne(+id);
  }

  @Get('professional/:professional_id')
  findOneByProfessionalId(@Param('professional_id') professional_id: string) {
    return this.professionalClientsService.findOneByProfessionalId(+professional_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessionalClientDto: UpdateProfessionalClientDto) {
    return this.professionalClientsService.update(+id, updateProfessionalClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalClientsService.remove(+id);
  }
}
