import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class BaseUserDto {
  @ApiProperty({
    description: 'Email adress of the user',
    example: 'them.email@example.com',
    format: 'email',
    maxLength: 255,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Firstname of the user',
    example: 'Jane',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  firstName: string;

  @ApiProperty({
    description: 'Lastname of the user',
    example: 'Doe',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  lastName: string;
}
