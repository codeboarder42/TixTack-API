import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { SubjectResponseDto } from 'src/subject/dto';

export class ServiceResponseDto {
  @ApiProperty({
    description: 'Id of the service',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Name of the service',
    example: 'IT Support',
    minLength: 1,
    maxLength: 45,
  })
  @Expose()
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the service',
    example: 'Support for IT related issues',
    minLength: 1,
    maxLength: 255,
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Subjects of the service',
    type: [SubjectResponseDto],
  })
  @Expose()
  @Type(() => SubjectResponseDto)
  subjects: SubjectResponseDto[];
}
