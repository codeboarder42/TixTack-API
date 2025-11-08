import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Application } from './application.entity';
import { UserApplicationRole } from './user-application-role.entity';

export enum RoleType {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('application_role')
@Unique(['application_id', 'role'])
export class ApplicationRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'application_id' })
  application_id: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    name: 'role',
  })
  role: RoleType;

  @ManyToOne(() => Application, (application) => application.applicationRoles)
  @JoinColumn({ name: 'application_id' })
  application: Application;

  @OneToMany(() => UserApplicationRole, (userRole) => userRole.applicationRole)
  userApplicationRoles: UserApplicationRole[];
}
