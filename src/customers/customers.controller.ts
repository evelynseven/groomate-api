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
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
