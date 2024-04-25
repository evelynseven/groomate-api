import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentDto } from './dto/index';
import { ApiOkResponse } from '@nestjs/swagger';

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
  @Put('customers/:customerId/appointments/:id')
  update(
    @Param('customerId') customerId: string,
    @Param('id') id: string,
    @Body() appointmentDto: AppointmentDto,
  ) {
    return this.appointmentsService.update(customerId, id, appointmentDto);
  }

  @Delete('customers/:customerId/appointments/:id')
  remove(@Param('customerId') customerId: string, @Param('id') id: string) {
    return this.appointmentsService.remove(customerId, id);
  }
}
