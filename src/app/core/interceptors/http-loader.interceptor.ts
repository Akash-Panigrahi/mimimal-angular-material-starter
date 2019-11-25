import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpLoaderService } from '../services/http-loader.service';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
    private _pendingRequestsCount = 0;

    constructor(private _httpLoaderService: HttpLoaderService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this._httpLoaderService.start();

        return next.handle(request).pipe(
            tap(
                (result: HttpEvent<any>) => {
                    // console.log('tap result', this._pendingRequestsCount);
                    const { type } = result;

                    if (type === HttpEventType.Sent) {
                        this._pendingRequestsCount++;
                    } else if (type === HttpEventType.Response) {
                        this._pendingRequestsCount--;
                    }
                },
                // hide loader on failure response
                () => {
                    // console.log('tap error', this._pendingRequestsCount);
                    // remove the request for which error occured
                    this._pendingRequestsCount--;
                    this._httpLoaderService.complete();
                }
            ),
            finalize(() => {
                // console.log('finalize', this._pendingRequestsCount);
                // this is for hiding loader only on multiple request's response
                if (this._pendingRequestsCount === 0) {
                    // console.log('no requests');
                    this._httpLoaderService.complete();
                }
            })
        );
    }
}
