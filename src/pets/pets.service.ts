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
        type: petDto.type,
        remarks: petDto.remarks,
        birthday: petDto.birthday,
        weight: petDto.weight,
        rabiesDue: petDto.rabiesDue,

        ownerId: customerId,
        breedId: petDto.breedId,
      },
    });
    return pet;
  }

  async findAll(customerId: string) {
    try {
      const pets = await this.prisma.pet.findMany({
        where: {
          ownerId: customerId,
        },
        include: {
          breed: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      const petsWithNames = pets.map((pet) => ({
        ...pet,
        breed: pet.breed.name,
      }));
      return petsWithNames;
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  }

  async findOne(customerId: string, id: string) {
    try {
      const pet = await this.prisma.pet.findFirst({
        include: {
          breed: {
            select: {
              name: true,
            },
          },
        },
        where: {
          ownerId: customerId,
          id: id,
        },
      });
      const petsWithNames = {
        ...pet,
        breed: pet.breed.name,
      };
      return petsWithNames;
    } catch (error) {
      console.error('Error fetching pet:', error);
    }
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
        type: petDto.type,
        breedId: petDto.breedId,
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
