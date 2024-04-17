import { ApiProperty } from '@nestjs/swagger';

export class HumanDto {
  @ApiProperty({
    description: 'The name of human',
    default: 'John',
  })
  name: string;
  @ApiProperty({
    description: 'The age',
    minimum: 3,
  })
  age: number;
  gender: boolean;
  address: string;
}
