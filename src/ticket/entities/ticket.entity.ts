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
  RelationId,
} from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
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
    nullable: false,
  })
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @RelationId((ticket: Ticket) => ticket.creator)
  creatorId: number;

  @ManyToOne(() => User, (user) => user.assignedTickets, {
    onDelete: 'SET NULL',
    nullable: false,
  })
  @JoinColumn({ name: 'assigned_to' })
  assignee: User;

  @RelationId((ticket: Ticket) => ticket.assignee)
  assigneeId: number;

  @ManyToOne(() => Subject, (subject) => subject.tickets, {
    onDelete: 'SET NULL',
    nullable: false,
  })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @RelationId((ticket: Ticket) => ticket.subject)
  subjectId: number;

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;

  @Column({ name: 'resolved_at' })
  resolvedAt?: Date | null;
}
