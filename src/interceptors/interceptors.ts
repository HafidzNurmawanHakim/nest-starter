import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class Interceptors {}

// @Injectable()
// export class TransformInterceptor implements NestInterceptor {
//   intercept(
//     context: ExecutionContext,
//     call$: Observable<any>,
//   ): Observable<any> {
//     return call$.pipe(map(data => classToPlain(data)));
//   }
// }
