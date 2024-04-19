import { ForbiddenException, Injectable } from '@nestjs/common';
import { CustomerDto } from './dto/index';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(customerDto: CustomerDto) {
    const customer = await this.prisma.customer.create({
      data: {
        firstName: customerDto.firstName,
        lastName: customerDto.lastName,
        phoneNumber: customerDto.phoneNumber,
        email: customerDto.email,
        remarks: customerDto.remarks,
      },
    });
    return customer;
  }

  findAll() {
    return this.prisma.customer.findMany();
  }

  findOne(id: string) {
    return this.prisma.customer.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, customerDto: CustomerDto) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: id,
      },
    });

    if (!customer) throw new ForbiddenException('Cannot find the customer');

    return this.prisma.customer.update({
      where: {
        id: id,
      },
      data: {
        firstName: customerDto.firstName,
        lastName: customerDto.lastName,
        phoneNumber: customerDto.phoneNumber,
        email: customerDto.email,
        remarks: customerDto.remarks,
      },
    });
  }

  async remove(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: id,
      },
    });

    if (!customer) throw new ForbiddenException('Cannot find the customer');

    await this.prisma.customer.delete({
      where: {
        id: id,
      },
    });
  }
}
