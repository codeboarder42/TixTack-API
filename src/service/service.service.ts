import { Injectable, NotFoundException } from '@nestjs/common';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceResponseDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<ServiceResponseDto[]> {
    const services = await this.serviceRepository.find({
      relations: ['subjects'],
      order: {
        name: 'ASC',
        subjects: {
          name: 'ASC',
        },
      },
    });
    return plainToInstance(ServiceResponseDto, services);
  }

  async findOneById(id: string): Promise<ServiceResponseDto> {
    let service: Service;
    try {
      service = await this.serviceRepository.findOneOrFail({
        where: { id },
        relations: ['subjects'],
      });
    } catch {
      throw new NotFoundException(`Serice with id ${id} not fouond`);
    }
    return plainToInstance(ServiceResponseDto, service);
  }

  async create(
    createServiceDto: CreateServiceDto,
  ): Promise<ServiceResponseDto> {
    const service = await this.serviceRepository.save(createServiceDto);
    return plainToInstance(ServiceResponseDto, service);
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<ServiceResponseDto> {
    let service: Service;
    try {
      service = await this.serviceRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException(`Serice with id ${id} not fouond`);
    }
    const updateService = { ...service, ...updateServiceDto } as Service;
    const updatedService = await this.serviceRepository.save(updateService);
    return plainToInstance(ServiceResponseDto, updatedService);
  }

  async delete(id: string) {
    try {
      await this.serviceRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException(`Serice with id ${id} not fouond`);
    }
    await this.serviceRepository.delete(id);
  }
}
