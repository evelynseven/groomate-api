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

@Controller('customers/:customerId/pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Param('customerId') customerId: string, @Body() petDto: PetDto) {
    return this.petsService.create(customerId, petDto);
  }

  @Get()
  findAll(@Param('customerId') customerId: string) {
    return this.petsService.findAll(customerId);
  }

  @Get(':id')
  findOne(@Param('customerId') customerId: string, @Param('id') id: string) {
    return this.petsService.findOne(customerId, id);
  }

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
