import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectResponseDto } from './dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { serializeDto } from 'src/common/utils/serializer.helper';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  @ApiOkResponse({ type: [SubjectResponseDto] })
  async findAll(): Promise<SubjectResponseDto[]> {
    const subjects = await this.subjectService.findAll();
    return serializeDto(SubjectResponseDto, subjects);
  }

  @Get(':id')
  @ApiOkResponse({ type: SubjectResponseDto })
  @ApiNotFoundResponse({ description: 'Subject not found' })
  async findOneById(@Param('id') id: string): Promise<SubjectResponseDto> {
    const subject = await this.subjectService.findOneById(id);
    return serializeDto(SubjectResponseDto, subject);
  }

  @Post()
  @ApiCreatedResponse({ type: SubjectResponseDto })
  async create(@Body() subject: CreateSubjectDto): Promise<SubjectResponseDto> {
    const newSubject = await this.subjectService.create(subject);
    return serializeDto(SubjectResponseDto, newSubject);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SubjectResponseDto })
  @ApiNotFoundResponse({ description: 'Subject not found' })
  async update(
    @Param('id') id: string,
    @Body() subject: UpdateSubjectDto,
  ): Promise<SubjectResponseDto> {
    const updatedSubject = await this.subjectService.update(id, subject);
    return serializeDto(SubjectResponseDto, updatedSubject);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Subject deleted' })
  @ApiNotFoundResponse({ description: 'Subject not found' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.subjectService.delete(id);
  }
}
