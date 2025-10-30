import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async findAll(): Promise<Subject[]> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Subject> {
    return this.subjectService.findOneById(id);
  }

  @Post()
  async create(@Body() subject: CreateSubjectDto): Promise<Subject> {
    return this.subjectService.create(subject);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() subject: UpdateSubjectDto,
  ): Promise<Subject> {
    return this.subjectService.update(id, subject);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.subjectService.delete(id);
  }
}
