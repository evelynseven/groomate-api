import { BreedType } from '@prisma/client';

export class BreedDto {
  name: string;
  remarks: string;
  type: BreedType;
  coefficient: number;
}
