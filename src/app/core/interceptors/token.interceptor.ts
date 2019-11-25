import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

/**
 * not using providedIn
 * since it does not supports multi option
 * for specifying multiple interceptors
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private _storageService: StorageService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this._storageService.getItem('token');

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }

        return next.handle(request);
    }
}
