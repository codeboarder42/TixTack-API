import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SubjectResponseDto {
  @ApiProperty({
    description: 'Id of the subject',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Name of the subject',
    example: 'New computer',
    minLength: 1,
    maxLength: 255,
  })
  @Expose()
  name: string;

  @ApiPropertyOptional({
    description: 'Subject description',
    example: 'Asking for a new computer',
    minLength: 1,
    maxLength: 255,
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Service ID of the subject',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @Expose()
  serviceId: string;
}
