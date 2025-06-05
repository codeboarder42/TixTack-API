import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/common/entities/application-role.entity';

export const ROLE_KEY = 'role';
export const Roles = (...roles: RoleType[]) => SetMetadata(ROLE_KEY, roles);
