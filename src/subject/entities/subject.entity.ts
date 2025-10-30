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
} from 'typeorm';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ name: 'service_id' })
  service_id: string;

  @ManyToOne(() => Service, (service) => service.subjects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @OneToMany(() => Ticket, (ticket) => ticket.subject)
  tickets: Ticket[];

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
