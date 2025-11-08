import { Injectable, NotFoundException } from '@nestjs/common';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find({
      relations: ['subjects'],
      order: {
        name: 'ASC',
        subjects: {
          name: 'ASC',
        },
      },
    });
  }

  async findOneById(id: string): Promise<Service> {
    let service: Service;
    try {
      service = await this.serviceRepository.findOneOrFail({
        where: { id },
        relations: ['subjects'],
      });
    } catch {
      throw new NotFoundException(`Serice with id ${id} not fouond`);
    }
    return service;
  }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return this.serviceRepository.save(createServiceDto);
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    let service: Service;
    try {
      service = await this.serviceRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException(`Serice with id ${id} not fouond`);
    }
    const updateService = { ...service, ...updateServiceDto } as Service;
    return this.serviceRepository.save(updateService);
  }

  async delete(id: string) {
    try {
      await this.serviceRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException(`Serice with id ${id} not fouond`);
    }
    await this.serviceRepository.softDelete(id);
  }
}
