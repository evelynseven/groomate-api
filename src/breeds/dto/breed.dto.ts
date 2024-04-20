import { BreedType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class BreedDto {
  @ApiProperty({ example: 'British Shorthair' })
  name: string;

  @ApiProperty({ example: 'Good companion!' })
  remarks: string;

  @ApiProperty({ example: 'CAT' })
  type: BreedType;

  @ApiProperty({ example: 1 })
  coefficient: number;
}
