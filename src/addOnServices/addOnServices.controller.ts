import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AddOnServicesService } from './addOnServices.service';
import { AddOnServiceDto } from './dto/index';

@Controller('addons')
export class AddOnServicesController {
  constructor(private readonly addOnServicesService: AddOnServicesService) {}

  @Post()
  create(@Body() addOnServiceDto: AddOnServiceDto) {
    return this.addOnServicesService.create(addOnServiceDto);
  }

  @Get()
  findAll() {
    return this.addOnServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addOnServicesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() addOnServiceDto: AddOnServiceDto) {
    return this.addOnServicesService.update(id, addOnServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addOnServicesService.remove(id);
  }
}
