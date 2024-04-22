import { ApiProperty } from '@nestjs/swagger';

export class AddOnServiceDto {
  @ApiProperty({ example: '70a1d146-de8c-4eae-a8f9-d4aff6ac2bf6' })
  id: string;

  @ApiProperty({ example: 'Nail Trimming' })
  name: string;

  @ApiProperty({ example: 'NT' })
  nameAbbrev: string;

  @ApiProperty({ example: 'Only trimming. Grinding is not included.' })
  remarks: string;

  @ApiProperty({ example: 15.0 })
  price: number;

  @ApiProperty({ example: false })
  isDeleted: boolean;
}
