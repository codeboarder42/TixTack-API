import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserApplicationRole } from 'src/common/entities/user-application-role.entity';
import { Timestamp } from 'src/common/entities/timestamp.embeddable';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;

  @OneToMany(() => Ticket, (ticket) => ticket.creator)
  createdTickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.assignee)
  assignedTickets: Ticket[];

  @OneToMany(() => UserApplicationRole, (userRole) => userRole.user)
  userApplicationRoles: UserApplicationRole[];
}
