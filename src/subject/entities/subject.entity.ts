import { Timestamp } from 'src/common/entities/timestamp.embeddable';
import { Service } from 'src/service/entities/service.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'varchar' })
  description?: string | null;

  @ManyToOne(() => Service, (service) => service.subjects, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @RelationId((subject: Subject) => subject.service)
  serviceId: number;

  @OneToMany(() => Ticket, (ticket) => ticket.subject)
  tickets: Ticket[];

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null;
}
