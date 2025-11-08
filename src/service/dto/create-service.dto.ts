import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Name of the service',
    example: 'IT Support',
    minLength: 1,
    maxLength: 45,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the service',
    example: 'Support for IT related issues',
    minLength: 1,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  description?: string;
}
