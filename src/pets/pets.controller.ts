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

@Controller()
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('customers/:customerId/pets')
  create(@Param('customerId') customerId: string, @Body() petDto: PetDto) {
    return this.petsService.create(customerId, petDto);
  }

  @Get('customers/:customerId/pets')
  findAll(@Param('customerId') customerId: string) {
    return this.petsService.findAll(customerId);
  }

  @Get('customers/:customerId/pets/:id')
  findOne(@Param('customerId') customerId: string, @Param('id') id: string) {
    return this.petsService.findOne(customerId, id);
  }

  @Put('customers/:customerId/pets/:id')
  update(
    @Param('customerId') customerId: string,
    @Param('id') id: string,
    @Body() petDto: PetDto,
  ) {
    return this.petsService.update(customerId, id, petDto);
  }

  @Delete('customers/:customerId/pets/:id')
  remove(@Param('customerId') customerId: string, @Param('id') id: string) {
    return this.petsService.remove(customerId, id);
  }
}
