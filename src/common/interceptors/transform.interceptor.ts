import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.removeNulls(data)));
  }

  private removeNulls(obj: any): any {
    if (obj === null || obj === undefined) return undefined;
    if (Array.isArray(obj)) return obj.map((item) => this.removeNulls(item));
    if (typeof obj !== 'object') return obj;

    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleaned = this.removeNulls(value);
      if (cleaned !== null && cleaned !== undefined) {
        acc[key] = cleaned;
      }
      return acc;
    }, {} as any);
  }
}
