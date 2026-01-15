import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menus')
export class MenusController {
    constructor(private readonly menusService: MenusService) { }

    @Post()
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menusService.create(createMenuDto);
    }

    @Get()
    findAll(
        @Query('professional_id') professionalId: string,
        @Query('client_id') clientId?: string,
    ) {
        return this.menusService.findAll(+professionalId, clientId ? +clientId : undefined);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.menusService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menusService.update(id, updateMenuDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.menusService.remove(id);
    }
}
