import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Roles } from 'src/guards/role.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { RoleType } from 'src/common/entities/application-role.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { ServiceResponseDto } from './dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { serializeDto } from 'src/common/utils/serializer.helper';

@ApiTags('service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @ApiOkResponse({ type: [ServiceResponseDto] })
  async findAll(): Promise<ServiceResponseDto[]> {
    const services = await this.serviceService.findAll();
    return serializeDto(ServiceResponseDto, services);
  }

  @Get(':id')
  @ApiOkResponse({ type: ServiceResponseDto })
  @ApiNotFoundResponse({ description: 'Service not found' })
  async findOneById(@Param('id') id: string): Promise<ServiceResponseDto> {
    const service = await this.serviceService.findOneById(id);
    return serializeDto(ServiceResponseDto, service);
  }

  @Post()
  @ApiCreatedResponse({ type: ServiceResponseDto })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleType.ADMIN)
  async create(@Body() service: CreateServiceDto): Promise<ServiceResponseDto> {
    const newService = await this.serviceService.create(service);
    return serializeDto(ServiceResponseDto, newService);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ServiceResponseDto })
  @ApiNotFoundResponse({ description: 'Service not found' })
  async update(
    @Param('id') id: string,
    @Body() service: UpdateServiceDto,
  ): Promise<ServiceResponseDto> {
    const updatedService = await this.serviceService.update(id, service);
    return serializeDto(ServiceResponseDto, updatedService);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Service deleted' })
  @ApiNotFoundResponse({ description: 'Service not found' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.serviceService.delete(id);
  }
}
