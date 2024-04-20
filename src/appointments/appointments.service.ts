import { ForbiddenException, Injectable } from '@nestjs/common';
import { AppointmentDto } from './dto/index';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(
    customerId: string,
    associateId: string,
    appointmentDto: AppointmentDto,
  ) {
    const addOns = appointmentDto.addOns.map((addOn) => ({ id: addOn.id }));

    const appointment = await this.prisma.appointment.create({
      data: {
        remarks: appointmentDto.remarks,
        appointmentTime: appointmentDto.appointmentTime,

        customerId: customerId,
        petId: appointmentDto.petId,
        associateId: associateId,
        baseServiceId: appointmentDto.baseServiceId,

        addOns: { connect: addOns },
      },
    });
    return appointment;
  }

  findAll(customerId: string) {
    return this.prisma.appointment.findMany({
      where: {
        customerId: customerId,
      },
    });
  }

  findOne(customerId: string, id: string) {
    return this.prisma.appointment.findFirst({
      where: {
        customerId: customerId,
        id: id,
      },
    });
  }

  async update(customerId: string, id: string, appointmentDto: AppointmentDto) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        customerId: customerId,
        id: id,
      },
    });

    if (!appointment || appointment.customerId !== customerId)
      throw new ForbiddenException('Cannot find the appointment');

    return this.prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        remarks: appointmentDto.remarks,
        appointmentTime: appointmentDto.appointmentTime,
      },
    });
  }

  async remove(customerId: string, id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        customerId: customerId,
        id: id,
      },
    });

    if (!appointment || appointment.customerId !== customerId)
      throw new ForbiddenException('Cannot find the appointment');

    await this.prisma.appointment.delete({
      where: {
        id: id,
      },
    });
  }
}
