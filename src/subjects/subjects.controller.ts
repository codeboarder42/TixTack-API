import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectService: SubjectsService) {}

  @Get()
  async findAll(): Promise<Subject[]> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Subject | null> {
    return this.subjectService.findOneById(id);
  }

  @Post()
  async create(@Body() subject: CreateSubjectDto): Promise<Subject> {
    return this.subjectService.create(subject);
  }

  @Put()
  async update(
    @Param('id') id: string,
    @Body() subject: UpdateSubjectDto,
  ): Promise<Subject | null> {
    return this.subjectService.update(id, subject);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.subjectService.delete(id);
  }
}
