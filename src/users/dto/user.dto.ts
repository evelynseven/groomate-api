import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'Aaron' })
  firstName: string;

  @ApiProperty({ example: 'S' })
  lastName: string;

  @ApiProperty({ example: '437 340 7590' })
  phoneNumber: string;

  @ApiProperty({ example: 'As12345' })
  password: string;

  @ApiProperty({ example: 'aarons@groomate.com' })
  email: string;

  @ApiProperty({ example: 'Toronto, CA' })
  address: string;

  @ApiProperty({ example: 'Salon Manager' })
  remarks: string;
}
