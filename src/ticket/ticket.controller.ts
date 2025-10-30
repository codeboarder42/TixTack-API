import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto, UpdateTicketDto } from './dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.findOneById(id);
  }

  @Post()
  async create(@Body() ticket: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(ticket);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() ticket: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketService.update(id, ticket);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.ticketService.delete(id);
  }
}
