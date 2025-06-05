import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    if (!user || !user.id) {
      throw new ForbiddenException('Utilisateur non authentifié');
    }

    if (!user.roles || !Array.isArray(user.roles)) {
      throw new ForbiddenException('Aucun rôle assigné à cet utilisateur');
    }

    // Vérifier si l'utilisateur a au moins un des rôles requis
    const hasRequiredRole = requiredRoles.some((requiredRole) =>
      user.roles.includes(requiredRole),
    );

    if (!hasRequiredRole) {
      throw new ForbiddenException(
        'Permissions insuffisantes pour cette action',
      );
    }
    return true;
  }
}
