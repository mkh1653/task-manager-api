import { tap, map, catchError, Observable } from 'rxjs';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    const now = Date.now();

    // log request
    console.log(`[Request] ${method} ${url}`);
    console.log(`[Body]`, body);

    return next.handle().pipe(
      // log of reponse and time
      tap(() =>
        console.log(`[Response] ${method} ${url} - ${Date.now() - now}ms`),
      ),

      map((data) => {
        console.log(`[Modified Response]`, data);
        return {
          success: true,
          timestamp: new Date().toISOString(),
          data,
        };
      }),

      // handel error
      catchError((err) => {
        console.error(`[Error]`, err.message);
        throw err;
      }),
    );
  }
}
