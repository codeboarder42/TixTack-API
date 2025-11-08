import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'Subject itself',
    example: 'New computer',
    minLength: 1,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty({
    description: 'Subject description',
    example: 'Asking for a new computer',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  description: string;

  @ApiProperty({
    description: 'Service ID associated with the subject',
    example: '78f2fdfa-290c-401c-553f-cc4d492e051d',
  })
  @IsNotEmpty()
  @IsUUID('4')
  serviceId: string;
}
