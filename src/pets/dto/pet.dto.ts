import { BreedType, GroomRating } from '@prisma/client';

export class PetDto {
  name: string;
  remarks: string;
  type: BreedType;
  birthday: Date;
  weight: number;
  groomRating: GroomRating;
  rabiesDue: Date;

  ownerId: string;
  breedId: string;
}
