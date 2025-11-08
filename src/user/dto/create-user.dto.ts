import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto extends PartialType(BaseUserDto) {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  lastName: string;
}
