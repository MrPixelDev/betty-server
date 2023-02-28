import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { rateLimit } from "utils-decorators";

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  // constructor(private readonly allowedCalls: number) {}

  // createRateLimitDecorator(): any {
  //   const config = {
  //     allowedCalls: this.allowedCalls,
  //     timeSpanMs: 1000 * 60 * 2,
  //     keyResolver: (context: ExecutionContext) =>
  //       context.switchToHttp().getRequest().headers.authorization.split(" ")[1],
  //     exceedHandler: () => {
  //       throw new HttpException(
  //         "Rate limit exceeded",
  //         HttpStatus.TOO_MANY_REQUESTS
  //       );
  //     },
  //   };
  //   return rateLimit({ ...config });
  // }

  // intercept(
  //   context: ExecutionContext,
  //   next: CallHandler<any>
  // ): Observable<any> {
  //   const rateLimitDecorator = this.createRateLimitDecorator();
  //   return rateLimitDecorator(context, next);
  // }
  @rateLimit({
    allowedCalls: 1,
    timeSpanMs: 1000 * 5,
    keyResolver: (context: ExecutionContext) =>
      context.switchToHttp().getRequest().headers.authorization.split(" ")[1],
    exceedHandler: () => {
      throw new HttpException(
        "Rate limit exceeded",
        HttpStatus.TOO_MANY_REQUESTS
      );
    },
  })
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> {
    return next.handle();
  }
}
