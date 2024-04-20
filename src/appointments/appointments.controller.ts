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

@Controller('customers/:customerId/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(
    @Param('customerId') customerId: string,
    @Body() appointmentDto: AppointmentDto,
  ) {
    return this.appointmentsService.create(
      customerId,
      '85d3b00f-546e-43b1-ac86-c8e437fc207e',
      appointmentDto,
    );
  }

  @Get()
  findAll(@Param('customerId') customerId: string) {
    return this.appointmentsService.findAll(customerId);
  }

  @Get(':id')
  findOne(@Param('customerId') customerId: string, @Param('id') id: string) {
    return this.appointmentsService.findOne(customerId, id);
  }

  @Put(':id')
  update(
    @Param('customerId') customerId: string,
    @Param('id') id: string,
    @Body() appointmentDto: AppointmentDto,
  ) {
    return this.appointmentsService.update(customerId, id, appointmentDto);
  }

  @Delete(':id')
  remove(@Param('customerId') customerId: string, @Param('id') id: string) {
    return this.appointmentsService.remove(customerId, id);
  }
}
