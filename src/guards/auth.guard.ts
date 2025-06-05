import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import '@fastify/cookie';
import { UserSession } from 'src/auth/interfaces/user-session.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const sessionId = this.extractSessionFromCookie(request);
    if (!sessionId) {
      throw new UnauthorizedException('Session non trouvée');
    }

    const user = await this.getUserFromSession(sessionId);

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    (request as any).user = user;

    return true;
  }
  private extractSessionFromCookie(request: FastifyRequest): string | null {
    const sessionId = request.cookies?.sessionId;
    return sessionId || null;
  }

  private async getUserFromSession(
    sessionId: string,
  ): Promise<UserSession | null> {
    // TODO: Implémenter la logique réelle de récupération de l'utilisateur
    // Pour l'instant, on retourne un utilisateur factice
    return {
      id: 'fake-uuid-for-testing',
      email: 'admin@example.com',
      first_name: 'Admin',
      last_name: 'User',
      roles: ['admin'], // Rôles stockés dans Redis
    };
  }
}
