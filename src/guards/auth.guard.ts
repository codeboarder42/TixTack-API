import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import '@fastify/cookie';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const sessionId = this.extractSessionFromCookie(request);
    if (!sessionId) {
      throw new UnauthorizedException('Session non trouvée');
    }

    const fakeUser = {
      id: 'fae-uuid',
      email: 'email',
      role: ['role1', 'role2'],
    };

    return true;
  }
  private extractSessionFromCookie(request: FastifyRequest): string | null {
    const sessionId = request.cookies?.sessionId;
    return sessionId || null;
  }
}
