import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  async findOneById(id: string): Promise<Subject> {
    let subject: Subject;
    try {
      subject = await this.subjectRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException(`Subject with id ${id} not found`);
    }
    return subject;
  }

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectRepository.save(createSubjectDto);
  }

  async update(
    id: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    let subject: Subject;
    try {
      subject = await this.subjectRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException(`Subject with id ${id} not found`);
    }
    const updatedSubject = { ...subject, ...updateSubjectDto } as Subject;
    return await this.subjectRepository.save(updatedSubject);
  }

  async delete(id: string) {
    try {
      await this.subjectRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException(`Subject with id ${id} not found`);
    }
    await this.subjectRepository.delete(id);
  }
}
