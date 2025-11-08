import { Timestamp } from 'src/common/entities/timestamp.embeddable';
import { Subject } from 'src/subject/entities/subject.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @OneToMany(() => Subject, (subject) => subject.service)
  subjects: Subject[];

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
