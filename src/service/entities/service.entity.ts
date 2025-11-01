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

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar' })
  description?: string | null;

  @OneToMany(() => Subject, (subject) => subject.service)
  subjects: Subject[];

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null;
}
