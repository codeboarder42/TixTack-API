import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class BaseServiceDto {
  @ApiProperty({
    description: 'Name of the service',
    example: 'IT Support',
    minLength: 1,
    maxLength: 45,
  })
  @IsString()
  @Length(1, 45)
  name: string;

  @ApiProperty({
    description: 'Description of the service',
    example: 'Support for IT related issues',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  description: string;
}
