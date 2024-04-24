import { ForbiddenException, Injectable } from '@nestjs/common';
import { BreedDto } from './dto/index';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BreedsService {
  constructor(private prisma: PrismaService) {}

  async create(breedDto: BreedDto) {
    const breed = await this.prisma.breed.create({
      data: {
        name: breedDto.name,
        type: breedDto.type,
        coefficient: breedDto.coefficient,
        remarks: breedDto.remarks,
      },
    });
    return breed;
  }

  findAll() {
    return this.prisma.breed.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.breed.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, breedDto: BreedDto) {
    const breed = await this.prisma.breed.findUnique({
      where: {
        id: id,
      },
    });

    if (!breed) throw new ForbiddenException('Cannot find the breed');

    return this.prisma.breed.update({
      where: {
        id: id,
      },
      data: {
        name: breedDto.name,
        type: breedDto.type,
        coefficient: breedDto.coefficient,
        remarks: breedDto.remarks,
      },
    });
  }

  async remove(id: string) {
    const breed = await this.prisma.breed.findUnique({
      where: {
        id: id,
      },
    });

    if (!breed) throw new ForbiddenException('Cannot find the breed');

    await this.prisma.breed.delete({
      where: {
        id: id,
      },
    });
  }
}
