import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApplicationRole } from './application-role.entity';

@Entity()
export class UserApplicationRole {
  @PrimaryColumn('uuid', { name: 'user_id' })
  user_id: string;

  @PrimaryColumn('uuid', { name: 'application_role_id' })
  application_role_id: string;

  @ManyToOne(() => User, (user) => user.userApplicationRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ApplicationRole, (role) => role.userApplicationRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_role_id' })
  applicationRole: ApplicationRole;
}
