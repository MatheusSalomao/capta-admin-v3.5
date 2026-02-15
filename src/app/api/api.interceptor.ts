import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const rawToken = localStorage.getItem('api_token');
    if (!rawToken) {
      return this.handleErrors(next.handle(req));
    }
    const token = rawToken.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`;
    const authReq = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
    return this.handleErrors(next.handle(authReq));
  }

  private handleErrors(stream: Observable<HttpEvent<unknown>>): Observable<HttpEvent<unknown>> {
    return stream.pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 400:
              (error as { message?: string }).message = 'Requisição inválida.';
              break;
            case 401:
              (error as { message?: string }).message = 'Autenticação necessária.';
              break;
            case 403:
              (error as { message?: string }).message = 'Sem autorização para esta ação.';
              break;
            case 422:
              (error as { message?: string }).message =
                'Dados inválidos. Verifique os campos enviados.';
              break;
            default:
              if (error.status >= 500) {
                (error as { message?: string }).message =
                  'Erro interno do servidor. Tente novamente mais tarde.';
              }
          }
        }
        return throwError(() => error);
      }),
    );
  }
}
