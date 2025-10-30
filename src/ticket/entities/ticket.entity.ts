import { Timestamp } from 'src/common/entities/timestamp.embeddable';
import { TicketPriority, TicketStatus } from 'src/common/enum';
import { Subject } from 'src/subject/entities/subject.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @Column({
    type: 'enum',
    enum: TicketPriority,
    default: TicketPriority.LOW,
  })
  priority: TicketPriority;

  @ManyToOne(() => User, (user) => user.createdTickets, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @ManyToOne(() => User, (user) => user.assignedTickets, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'assigned_to' })
  assignee: User;

  @Column({ name: 'subject_id' })
  subjectId: string;
  @ManyToOne(() => Subject, (subject) => subject.tickets, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;

  @Column({ name: 'resolved_at', nullable: true })
  resolvedAt: Date;
}
