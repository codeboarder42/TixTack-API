import { Timestamp } from 'src/common/entities/timestamp.embeddable';
import { TicketPriority, TicketStatus } from 'src/common/enum';
import { Subject } from 'src/subject/entities/subject.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
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

  @Column({ name: 'created_by' })
  creatorId: string;

  @ManyToOne(() => User, (user) => user.assignedTickets, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'assigned_to' })
  assignee: User;

  @Column({ name: 'assigned_to' })
  assigneeId: string;

  @ManyToOne(() => Subject, (subject) => subject.tickets, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column({ name: 'subject_id' })
  subjectId: string;

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;

  @Column({ name: 'resolved_at', type: 'timestamp', nullable: true })
  resolvedAt?: Date;
}
