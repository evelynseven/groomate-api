import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'Aaron' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'S' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Aaron S' })
  fullName: string;

  @ApiProperty({ example: '4373407590' })
  // @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ example: 'As12345' })
  password: string;

  @ApiProperty({ example: 'aarons@groomate.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'ASSOCIATE' })
  role: Role;

  @ApiProperty({ example: 'Toronto, CA' })
  address: string;

  @ApiProperty({ example: 'Salon Manager' })
  remarks: string;
}
