import { ForbiddenException, Injectable } from '@nestjs/common';
import { AddOnServiceDto } from './dto/index';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AddOnServicesService {
  constructor(private prisma: PrismaService) {}

  async create(addOnServiceDto: AddOnServiceDto) {
    const addOnService = await this.prisma.addOn.create({
      data: {
        name: addOnServiceDto.name,
        remarks: addOnServiceDto.remarks,
        nameAbbrev: addOnServiceDto.nameAbbrev,
        price: addOnServiceDto.price,
      },
    });
    return addOnService;
  }

  findAll() {
    return this.prisma.addOn.findMany();
  }

  findOne(id: string) {
    return this.prisma.addOn.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, addOnServiceDto: AddOnServiceDto) {
    const addOnService = await this.prisma.addOn.findUnique({
      where: {
        id: id,
      },
    });

    if (!addOnService) throw new ForbiddenException('Cannot find the add-on');

    return this.prisma.addOn.update({
      where: {
        id: id,
      },
      data: {
        name: addOnServiceDto.name,
        remarks: addOnServiceDto.remarks,
        nameAbbrev: addOnServiceDto.nameAbbrev,
        price: addOnServiceDto.price,
      },
    });
  }

  async deactivate(id: string) {
    const addOnService = await this.prisma.addOn.findUnique({
      where: {
        id: id,
      },
    });

    if (!addOnService) throw new ForbiddenException('Cannot find the add-on');

    await this.prisma.addOn.update({
      where: {
        id: id,
      },
      data: {
        isActive: true,
      },
    });
  }

  async remove(id: string) {
    const addOnService = await this.prisma.addOn.findUnique({
      where: {
        id: id,
      },
    });

    if (!addOnService) throw new ForbiddenException('Cannot find the add-on');

    await this.prisma.addOn.delete({
      where: {
        id: id,
      },
    });
  }
}
