import { ForbiddenException, Injectable } from '@nestjs/common';
import { PetDto } from './dto/index';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create(customerId: string, petDto: PetDto) {
    const pet = await this.prisma.pet.create({
      data: {
        name: petDto.name,
        remarks: petDto.remarks,
        birthday: petDto.birthday,
        weight: petDto.weight,
        groomRating: petDto.groomRating,
        rabiesDue: petDto.rabiesDue,

        ownerId: customerId,
        breedId: petDto.breedId,
      },
    });
    return pet;
  }

  findAll(customerId: string) {
    return this.prisma.pet.findMany({
      where: {
        ownerId: customerId,
      },
    });
  }

  findOne(customerId: string, id: string) {
    return this.prisma.pet.findFirst({
      where: {
        ownerId: customerId,
        id: id,
      },
    });
  }

  async update(customerId: string, id: string, petDto: PetDto) {
    const pet = await this.prisma.pet.findUnique({
      where: {
        ownerId: customerId,
        id: id,
      },
    });

    if (!pet || pet.ownerId !== customerId)
      throw new ForbiddenException('Cannot find the pet');

    return this.prisma.pet.update({
      where: {
        id: id,
      },
      data: {
        name: petDto.name,
        remarks: petDto.remarks,
        birthday: petDto.birthday,
        weight: petDto.weight,
        groomRating: petDto.groomRating,
        rabiesDue: petDto.rabiesDue,
      },
    });
  }

  async remove(customerId: string, id: string) {
    const pet = await this.prisma.pet.findUnique({
      where: {
        ownerId: customerId,
        id: id,
      },
    });

    if (!pet || pet.ownerId !== customerId)
      throw new ForbiddenException('Cannot find the pet');

    await this.prisma.pet.delete({
      where: {
        id: id,
      },
    });
  }
}
