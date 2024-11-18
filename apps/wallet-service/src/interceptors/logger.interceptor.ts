import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { catchError, Observable, tap } from "rxjs";
import { Logger } from "winston";
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>  {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const startTime = Date.now();

    const { method, originalUrl } = request;
    const requestBody = request.body;
    const queryParams = request.query;
    const headers = request.headers;
    const clientIp = request.ip;

    this.logger.log('info', {
      method,
      url: originalUrl,
      body: requestBody,
      queryParams,
      headers,
      clientIp,
    });

    return next.handle().pipe(
      tap((data) => {
        const responseTime = Date.now() - startTime;
        const { statusCode } = response;

        this.logger.info('Outgoing response', {
          method,
          url: originalUrl,
          statusCode,
          responseTime: `${responseTime}ms`,
          responseBody: data,
          timestamp: new Date().toISOString(),
        });
      }),
      catchError((error) => {
        const responseTime = Date.now() - startTime;
        const { statusCode } = response;
        this.logger.error('Error in processing request', {
          method,
          url: originalUrl,
          statusCode,
          responseTime: `${responseTime}ms`,
          errorMessage: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        });

        throw error;
      })
    )
  }
}