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
  Unique,
} from 'typeorm';

@Entity('subjects')
@Unique(['name', 'serviceId'])
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @ManyToOne(() => Service, (service) => service.subjects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ name: 'service_id' })
  serviceId: string;

  @OneToMany(() => Ticket, (ticket) => ticket.subject)
  tickets: Ticket[];

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
