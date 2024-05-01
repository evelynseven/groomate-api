import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerDto } from './dto/index';
import { ApiOkResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOkResponse({ type: CustomerDto })
  @Post()
  create(@Body() customerDto: CustomerDto) {
    return this.customersService.create(customerDto);
  }

  @ApiOkResponse({ type: CustomerDto })
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @ApiOkResponse({ type: CustomerDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @ApiOkResponse({ type: CustomerDto })
  @Put(':id')
  update(@Param('id') id: string, @Body() customerDto: CustomerDto) {
    return this.customersService.update(id, customerDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
