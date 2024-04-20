import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetDto } from './dto/index';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('customers/:customerId/pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiOkResponse({ type: PetDto })
  @Post()
  create(@Param('customerId') customerId: string, @Body() petDto: PetDto) {
    return this.petsService.create(customerId, petDto);
  }

  @ApiOkResponse({ type: PetDto })
  @Get()
  findAll(@Param('customerId') customerId: string) {
    return this.petsService.findAll(customerId);
  }

  @ApiOkResponse({ type: PetDto })
  @Get(':id')
  findOne(@Param('customerId') customerId: string, @Param('id') id: string) {
    return this.petsService.findOne(customerId, id);
  }

  @ApiOkResponse({ type: PetDto })
  @Put(':id')
  update(
    @Param('customerId') customerId: string,
    @Param('id') id: string,
    @Body() petDto: PetDto,
  ) {
    return this.petsService.update(customerId, id, petDto);
  }

  @Delete(':id')
  remove(@Param('customerId') customerId: string, @Param('id') id: string) {
    return this.petsService.remove(customerId, id);
  }
}
