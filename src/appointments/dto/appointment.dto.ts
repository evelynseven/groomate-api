import { AddOnServiceDto } from '../../addOnServices/dto/index';

export class AppointmentDto {
  remarks: string;
  appointmentTime: Date;

  customerId: string;
  petId: string;
  associateId: string;
  baseServiceId: string;

  addOns?: AddOnServiceDto[];
}
