import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'Subject itself',
    example: 'New computer',
    minLength: 1,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Subject description',
    example: 'Asking for a new computer',
    minLength: 1,
    maxLength: 255,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiProperty({
    description: 'Service ID associated with the subject',
    example: '78f2fdfa-290c-401c-553f-cc4d492e051d',
  })
  @IsNotEmpty()
  @IsUUID('4')
  serviceId: string;
}
