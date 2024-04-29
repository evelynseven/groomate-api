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
import { ApiOkResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @ApiOkResponse({ type: BreedDto })
  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  create(@Body() breedDto: BreedDto) {
    return this.breedsService.create(breedDto);
  }

  @ApiOkResponse({ type: BreedDto })
  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @ApiOkResponse({ type: BreedDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breedsService.findOne(id);
  }

  @ApiOkResponse({ type: BreedDto })
  @Put(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  update(@Param('id') id: string, @Body() breedDto: BreedDto) {
    return this.breedsService.update(id, breedDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.breedsService.remove(id);
  }
}
