import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BaseServicesService } from './baseServices.service';
import { BaseServiceDto } from './dto/index';

@Controller('services')
export class BaseServicesController {
  constructor(private readonly baseServicesService: BaseServicesService) {}

  @Post()
  create(@Body() baseServiceDto: BaseServiceDto) {
    return this.baseServicesService.create(baseServiceDto);
  }

  @Get()
  findAll() {
    return this.baseServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseServicesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() baseServiceDto: BaseServiceDto) {
    return this.baseServicesService.update(id, baseServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseServicesService.remove(id);
  }
}
