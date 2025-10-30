import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto, UpdateTicketDto } from './dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async findOneById(id: string): Promise<Ticket> {
    return this.ticketRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOneByOrFail({ id });
    const updatedTicket = { ...ticket, ...updateTicketDto } as Ticket;
    return await this.ticketRepository.save(updatedTicket);
  }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketRepository.save(createTicketDto);
  }

  async delete(id: string) {
    await this.ticketRepository.findOneByOrFail({ id });
    await this.ticketRepository.delete(id);
    return { message: 'Ticket deleted' };
  }
}
