import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { AddOnServicesService } from './addOnServices.service';
import { AddOnServiceDto } from './dto/index';
import { ApiOkResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('addons')
export class AddOnServicesController {
  constructor(private readonly addOnServicesService: AddOnServicesService) {}

  @ApiOkResponse({ type: AddOnServiceDto })
  @Post()
  create(@Body() addOnServiceDto: AddOnServiceDto) {
    return this.addOnServicesService.create(addOnServiceDto);
  }

  @ApiOkResponse({ type: AddOnServiceDto })
  @Get()
  findAll() {
    return this.addOnServicesService.findAll();
  }

  @ApiOkResponse({ type: AddOnServiceDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addOnServicesService.findOne(id);
  }

  @ApiOkResponse({ type: AddOnServiceDto })
  @Put(':id')
  update(@Param('id') id: string, @Body() addOnServiceDto: AddOnServiceDto) {
    return this.addOnServicesService.update(id, addOnServiceDto);
  }

  @Patch(':id')
  deactivate(@Param('id') id: string) {
    return this.addOnServicesService.deactivate(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.addOnServicesService.remove(id);
  }
}
