import { ApiProperty } from '@nestjs/swagger';

export class BaseServiceDto {
  @ApiProperty({ example: 'Bath and Brush' })
  name: string;

  @ApiProperty({ example: 'B&B' })
  nameAbbrev: string;

  @ApiProperty({
    example:
      'Bath and Brush basic package include: bath, drying, nail trimming and paw-pad shaving.',
  })
  remarks: string;

  @ApiProperty({ example: 35.0 })
  basePrice: number;
}
