import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { TicketPriority, TicketStatus } from 'src/common/enum';

export class BaseTicketDto {
  @ApiProperty({
    description: 'Firstname of the ticket',
    example: 'Jane',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({
    description: 'Firstname of the ticket',
    example: 'Jane',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  description: string;

  @ApiProperty({
    enumName: 'TicketStatus',
    enum: TicketStatus,
    description: 'Current status of the ticket',
    example: 'open',
  })
  @IsEnum(TicketStatus)
  status: TicketStatus;

  @ApiProperty({
    enumName: 'TicketPriority',
    enum: TicketPriority,
    description: 'Priority of the ticket',
    example: 'medium',
  })
  @IsEnum(TicketPriority)
  priority: TicketPriority;

  @ApiProperty({
    description: 'Service ID associated with the subject',
    example: '78f2fdfa-290c-401c-553f-cc4d492e051d',
  })
  @IsUUID('4')
  creatorId: string;

  @ApiProperty({
    description: 'Service ID associated with the subject',
    example: '78f2fdfa-290c-401c-553f-cc4d492e051d',
  })
  @IsUUID('4')
  assigneeId: string;

  @ApiProperty({
    description: 'Service ID associated with the subject',
    example: '78f2fdfa-290c-401c-553f-cc4d492e051d',
  })
  @IsUUID('4')
  subjectId: string;

  @ApiProperty({
    description: 'When the ticket was resolved',
    example: '2025-10-23',
  })
  @IsDateString()
  resolvedAt: string;
}
