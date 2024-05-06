import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CustomerDto {
  @ApiProperty({ example: 'Evelyn' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Sun' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '4373407590' })
  // @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'evelynsun166@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Really good customer.' })
  remarks: string;
}
