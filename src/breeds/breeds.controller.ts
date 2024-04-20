import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedDto } from './dto/index';

@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  create(@Body() breedDto: BreedDto) {
    return this.breedsService.create(breedDto);
  }

  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breedsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() breedDto: BreedDto) {
    return this.breedsService.update(id, breedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breedsService.remove(id);
  }
}
