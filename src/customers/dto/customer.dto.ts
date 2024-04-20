import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({ example: 'Evelyn' })
  firstName: string;

  @ApiProperty({ example: 'Sun' })
  lastName: string;

  @ApiProperty({ example: '437 340 7590' })
  phoneNumber: string;

  @ApiProperty({ example: 'evelynsun166@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Really good customer.' })
  remarks: string;
}
