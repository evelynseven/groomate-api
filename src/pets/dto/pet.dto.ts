import { BreedType, GroomRating } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PetDto {
  @ApiProperty({ example: 'Seven' })
  name: string;

  @ApiProperty({ example: 'Good Cat!' })
  remarks: string;

  @ApiProperty({ example: 'CAT' })
  type: BreedType;

  @ApiProperty({ example: '2021-04-29T02:46:42.779Z' })
  birthday: Date;

  @ApiProperty({ example: 15 })
  weight: number;

  @ApiProperty({ example: 'PREFFERED' })
  groomRating: GroomRating;

  @ApiProperty({ example: '2025-04-29T02:46:42.779Z' })
  rabiesDue: Date;

  @ApiProperty({ example: '1baa85ca-d1cc-419e-b955-eddf26003f78' })
  ownerId: string;

  @ApiProperty({ example: '70a1d146-de8c-4eae-a8f9-d4aff6ac2bf6' })
  breedId: string;
}
