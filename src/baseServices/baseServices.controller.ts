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
import { ApiOkResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('services')
export class BaseServicesController {
  constructor(private readonly baseServicesService: BaseServicesService) {}

  @ApiOkResponse({ type: BaseServiceDto })
  @Post()
  create(@Body() baseServiceDto: BaseServiceDto) {
    return this.baseServicesService.create(baseServiceDto);
  }

  @ApiOkResponse({ type: BaseServiceDto })
  @Get()
  findAll() {
    return this.baseServicesService.findAll();
  }

  @ApiOkResponse({ type: BaseServiceDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseServicesService.findOne(id);
  }

  @ApiOkResponse({ type: BaseServiceDto })
  @Put(':id')
  update(@Param('id') id: string, @Body() baseServiceDto: BaseServiceDto) {
    return this.baseServicesService.update(id, baseServiceDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.baseServicesService.remove(id);
  }
}
