import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseServiceDto } from './base-service.dto';

export class CreateServiceDto extends PartialType(BaseServiceDto) {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;
}
