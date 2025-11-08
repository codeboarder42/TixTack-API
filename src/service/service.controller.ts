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

@ApiTags('service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @ApiOkResponse({ type: [ServiceResponseDto] })
  async findAll(): Promise<ServiceResponseDto[]> {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ServiceResponseDto })
  @ApiNotFoundResponse({ description: 'Serice not found' })
  async findOneById(@Param('id') id: string): Promise<ServiceResponseDto> {
    return this.serviceService.findOneById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: ServiceResponseDto })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleType.ADMIN)
  async create(@Body() service: CreateServiceDto): Promise<ServiceResponseDto> {
    return this.serviceService.create(service);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ServiceResponseDto })
  @ApiNotFoundResponse({ description: 'Serice not found' })
  async update(
    @Param('id') id: string,
    @Body() service: UpdateServiceDto,
  ): Promise<ServiceResponseDto> {
    return this.serviceService.update(id, service);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Service deleted' })
  @ApiNotFoundResponse({ description: 'Serice not found' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.serviceService.delete(id);
  }
}
