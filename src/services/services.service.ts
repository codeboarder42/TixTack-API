import { Injectable } from '@nestjs/common';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async findOneById(id: string): Promise<Service | null> {
    return this.serviceRepository.findOneByOrFail({ id });
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.serviceRepository.findOneByOrFail({ id });
    const updatedService = { ...service, ...updateServiceDto } as Service;
    return await this.serviceRepository.save(updatedService);
  }

  async delete(id: string) {
    await this.serviceRepository.findOneByOrFail({ id });
    await this.serviceRepository.delete(id);
    return { message: 'Service supprimé avec succès' };
  }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return this.serviceRepository.save(createServiceDto);
  }
}
