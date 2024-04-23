import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/index';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: UserDto) {
    const encryptedPwd = await argon.hash(userDto.password);
    const user = await this.prisma.user.create({
      data: {
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        fullName: `${userDto.firstName} ${userDto.lastName}`,
        phoneNumber: userDto.phoneNumber,
        hash: encryptedPwd,
        email: userDto.email,
        address: userDto.address,
        remarks: userDto.remarks,
      },
    });
    delete user.hash;
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    users.map((user) => {
      delete user.hash;
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    delete user.hash;
    return user;
  }

  async update(id: string, userDto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new ForbiddenException('Cannot find the user');

    const updatedUser = await this.prisma.user.update({
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

    return updatedUser;
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
