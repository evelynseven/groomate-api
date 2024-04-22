import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CustomerDto {
  @ApiProperty({ example: 'Evelyn' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Sun' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '437 340 7590' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'evelynsun166@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Really good customer.' })
  remarks: string;
}
