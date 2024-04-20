import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/index';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: UserDto) {
    const user = await this.prisma.user.create({
      data: {
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        phoneNumber: userDto.phoneNumber,
        hash: userDto.password,
        email: userDto.email,
        address: userDto.address,
        remarks: userDto.remarks,
      },
    });
    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, userDto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new ForbiddenException('Cannot find the user');

    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        phoneNumber: userDto.phoneNumber,
        hash: userDto.password,
        email: userDto.email,
        address: userDto.address,
        remarks: userDto.remarks,
      },
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new ForbiddenException('Cannot find the user');

    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
