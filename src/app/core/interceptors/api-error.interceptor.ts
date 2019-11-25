import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiErrorHandlerService } from '../services/api-error-handler.service';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
    constructor(private _apiErrorHandlerService: ApiErrorHandlerService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(res => {
                if (res instanceof HttpResponse) {
                    // skip body code checks
                    if (
                        // request.url.endsWith('check_duplicate_campname/') ||
                        // request.url.endsWith('route/view_route')
                        endsWith(request.url, [
                            'check_duplicate_campname/',
                            'route/view_route',
                            'route/assign_route/campaign',
                            'route/assign_route/user',
                            'route/manage_route',
                            'route/add_route',
                            'route/change_route/campaign',
                            'route/change_route/user',
                            'route/display_route_details',
                            'route/move_channels',
                            'route/delete_route',
                            'server/server_list',
                            'server/add_server',
                            'server/interface',
                            'server/server_act_deact',
                            'server/edit_pri',
                            'server/get_server'
                        ])
                    ) {
                        return;
                    }

                    // skip checks for csv files
                    if (res.headers.get('content-type').includes('text/csv')) {
                        return;
                    }

                    if (res.body.code !== 2000) {
                        this._apiErrorHandlerService.handleError(res);

                        // throwing error cancels the stream
                        throw new Error();
                    }
                }
            })
        );
    }
}

function endsWith(url: string, endpoints: string[]): boolean {
    return endpoints.some(endpoint => url.endsWith(endpoint));
}
