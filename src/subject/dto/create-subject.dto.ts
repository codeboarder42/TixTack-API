import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseSubjectDto } from './base-subject.dto';

export class CreateSubjectDto extends PartialType(BaseSubjectDto) {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  service_id: string;
}
