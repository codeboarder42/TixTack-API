import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}

  @Get()
  async findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Service | null> {
    return this.serviceService.findOneById(id);
  }

  @Post()
  async create(@Body() service: CreateServiceDto): Promise<Service> {
    return this.serviceService.create(service);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.serviceService.delete(id);
  }
}
