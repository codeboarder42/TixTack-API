import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BaseTicketDto } from './base-ticket.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateTicketDto extends PartialType(BaseTicketDto) {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  creatorId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  assigneeId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  subjectId: string;
}
