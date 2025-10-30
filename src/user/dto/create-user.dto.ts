import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto extends PartialType(BaseUserDto) {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  lastName: string;
}
