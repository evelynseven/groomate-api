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
import { AppointmentsService } from './appointments.service';
import { AppointmentDto } from './dto/index';
import { ApiOkResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiOkResponse({ type: AppointmentDto })
@Controller()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ApiOkResponse({ type: AppointmentDto })
  @Post('customers/:customerId/appointments')
  create(
    @Param('customerId') customerId: string,
    @Body() appointmentDto: AppointmentDto,
  ) {
    return this.appointmentsService.create(customerId, appointmentDto);
  }

  @ApiOkResponse({ type: AppointmentDto })
  @Get('appointments')
  findAll() {
    return this.appointmentsService.findAll();
  }

  @ApiOkResponse({ type: AppointmentDto })
  @Get('customers/:customerId/appointments')
  findAllByCustomer(@Param('customerId') customerId: string) {
    return this.appointmentsService.findAllByCustomer(customerId);
  }

  @ApiOkResponse({ type: AppointmentDto })
  @Get('appointments/:id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @ApiOkResponse({ type: AppointmentDto })
  @Get('customers/:customerId/appointments/:id')
  findOneByCustomer(
    @Param('customerId') customerId: string,
    @Param('id') id: string,
  ) {
    return this.appointmentsService.findOneByCustomer(customerId, id);
  }

  @ApiOkResponse({ type: AppointmentDto })
  @Put('appointments/:id')
  update(@Param('id') id: string, @Body() appointmentDto: AppointmentDto) {
    return this.appointmentsService.update(id, appointmentDto);
  }

  @ApiOkResponse({ type: AppointmentDto })
  @Put('appointments/:id/checkin')
  checkin(@Param('id') id: string) {
    return this.appointmentsService.checkin(id);
  }

  @ApiOkResponse({ type: AppointmentDto })
  @Put('appointments/:id/uncheckin')
  uncheckin(@Param('id') id: string) {
    return this.appointmentsService.uncheckin(id);
  }

  @ApiOkResponse({ type: AppointmentDto })
  @Put('appointments/:id/checkout')
  checkout(@Param('id') id: string) {
    return this.appointmentsService.checkout(id);
  }

  @ApiOkResponse({ type: AppointmentDto })
  @Put('appointments/:id/cancel')
  cancel(@Param('id') id: string) {
    return this.appointmentsService.cancel(id);
  }

  @Delete('appointments/:id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
