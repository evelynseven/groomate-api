import { AddOnServiceDto } from '../../addOnServices/dto/index';
import { ApiProperty } from '@nestjs/swagger';

export class AppointmentDto {
  @ApiProperty({ example: 'Starts off okay but turns aggressive when drying.' })
  remarks: string;

  @ApiProperty({ example: '2024-05-29T02:46:42.779Z' })
  appointmentTime: Date;

  @ApiProperty({ example: '1baa85ca-d1cc-419e-b955-eddf26003f78' })
  customerId: string;

  @ApiProperty({ example: '70a1d146-de8c-4eae-a8f9-d4aff6ac2bf6' })
  petId: string;

  @ApiProperty({ example: '2baa85ca-d1cc-419e-b955-eddf26003f78' })
  associateId: string;

  @ApiProperty({ example: '80a1d146-de8c-4eae-a8f9-d4aff6ac2bf6' })
  baseServiceId: string;

  @ApiProperty({
    example: [
      { id: '4ac6ddaf-87d9-4c75-80bf-d66787c08ec9' },
      { id: '55ecb5ae-24a0-42b2-aef4-11882479d7e5' },
    ],
  })
  addOns?: AddOnServiceDto[];
}
