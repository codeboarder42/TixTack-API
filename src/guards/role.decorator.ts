import { SetMetadata } from '@nestjs/common';
import { ApplicationRole } from 'src/common/entities/application-role.entity';

export const ROLE_KEY = 'role';
export const Roles = (...roles: ApplicationRole[]) =>
  SetMetadata(ROLE_KEY, roles);
