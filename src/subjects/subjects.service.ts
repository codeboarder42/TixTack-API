import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  async findOneById(id: string): Promise<Subject | null> {
    return this.subjectRepository.findOneByOrFail({ id });
  }

  async update(
    id: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    const subject = await this.subjectRepository.findOneByOrFail({ id });
    const updatedSubject = { ...subject, ...UpdateSubjectDto } as Subject;
    return await this.subjectRepository.save(updatedSubject);
  }

  async delete(id: string) {
    await this.subjectRepository.findOneByOrFail({ id });
    await this.subjectRepository.delete(id);
    return { message: 'Sujet supprimé avec succès' };
  }

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectRepository.save(createSubjectDto);
  }
}
