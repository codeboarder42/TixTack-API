import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsUUID, Length } from 'class-validator';
import { Timestamp } from 'src/common/entities/timestamp.embeddable';
import { ServiceResponseDto } from 'src/service/dto';

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

  @ApiProperty({
    description: 'Subject description',
    example: 'Asking for a new computer',
    minLength: 1,
    maxLength: 255,
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Id of the subject',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @Expose()
  serviceId: string;

  @ApiProperty({
    description: 'Service of the subject',
    type: () => ServiceResponseDto,
  })
  @Expose()
  @Type(() => ServiceResponseDto)
  servvice: ServiceResponseDto;

  @Exclude()
  timestamp: Timestamp;

  @Exclude()
  deletedAt: Date;
}
