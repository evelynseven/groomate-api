import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'evelynsun166@gmail.com' })
  email: string;

  @ApiProperty({ example: 'qwert1!' })
  password: string;
}
