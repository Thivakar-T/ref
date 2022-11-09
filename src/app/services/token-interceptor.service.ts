import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {Observable} from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  aId: any;
  constructor(private service: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = this.service.currentUser();
    const token = this.service.getToken();
    const isLoggedIn = currentUser && token;
    const isApiUrl = request.url.startsWith(environment. API_URL);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Officy ${token}`,
        }
      });
    }
    return next.handle(request);
  }

}
