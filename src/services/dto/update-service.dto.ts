import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: string;
}
