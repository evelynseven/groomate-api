import { ForbiddenException, Injectable } from '@nestjs/common';
import { BaseServiceDto } from './dto/index';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BaseServicesService {
  constructor(private prisma: PrismaService) {}

  async create(baseServiceDto: BaseServiceDto) {
    const baseService = await this.prisma.service.create({
      data: {
        name: baseServiceDto.name,
        remarks: baseServiceDto.remarks,
        nameAbbrev: baseServiceDto.nameAbbrev,
        basePrice: baseServiceDto.basePrice,
      },
    });
    return baseService;
  }

  findAll() {
    return this.prisma.service.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.service.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, baseServiceDto: BaseServiceDto) {
    const baseService = await this.prisma.service.findUnique({
      where: {
        id: id,
      },
    });

    if (!baseService) throw new ForbiddenException('Cannot find the service');

    return this.prisma.service.update({
      where: {
        id: id,
      },
      data: {
        name: baseServiceDto.name,
        remarks: baseServiceDto.remarks,
        nameAbbrev: baseServiceDto.nameAbbrev,
        basePrice: baseServiceDto.basePrice,
      },
    });
  }

  async remove(id: string) {
    const baseService = await this.prisma.service.findUnique({
      where: {
        id: id,
      },
    });

    if (!baseService) throw new ForbiddenException('Cannot find the service');

    await this.prisma.service.delete({
      where: {
        id: id,
      },
    });
  }
}
