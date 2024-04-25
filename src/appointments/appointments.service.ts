import { ForbiddenException, Injectable } from '@nestjs/common';
import { AppointmentDto } from './dto/index';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(customerId: string, appointmentDto: AppointmentDto) {
    let addOns = [];
    if (appointmentDto.addOns) {
      addOns = appointmentDto.addOns.map((addOn) => ({ id: addOn.id }));
    }
    const date = new Date(appointmentDto.appointmentTime);
    const isoString = date.toISOString();
    console.log(isoString);

    const appointment = await this.prisma.appointment.create({
      data: {
        remarks: appointmentDto.remarks,
        appointmentTime: appointmentDto.appointmentTime,

        customerId: customerId,
        petId: appointmentDto.petId,
        associateId: appointmentDto.associateId,
        baseServiceId: appointmentDto.baseServiceId,

        addOns: { connect: addOns },
      },
    });
    return appointment;
  }

  async findAll() {
    try {
      const appointments = await this.prisma.appointment.findMany({
        include: {
          customer: {
            select: {
              fullName: true,
            },
          },
          pet: {
            select: {
              name: true,
            },
          },
          associate: {
            select: {
              fullName: true,
            },
          },
        },
        orderBy: {
          appointmentTime: 'asc',
        },
      });

      const appointmentsWithNames = appointments.map((appointment) => ({
        ...appointment,
        customer: appointment.customer.fullName,
        pet: appointment.pet.name,
        associate: appointment.associate.fullName,
      }));
      return appointmentsWithNames;
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  findAllByCustomer(customerId: string) {
    return this.prisma.appointment.findMany({
      where: {
        customerId: customerId,
      },
      orderBy: {
        appointmentTime: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.appointment.findFirst({
      where: {
        id: id,
      },
    });
  }

  findOneByCustomer(customerId: string, id: string) {
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
