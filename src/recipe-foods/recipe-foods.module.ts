import { Module } from '@nestjs/common';
import { RecipeFoodsService } from './recipe-foods.service';
import { RecipeFoodsController } from './recipe-foods.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [RecipeFoodsController],
    providers: [RecipeFoodsService],
})
export class RecipeFoodsModule { }
