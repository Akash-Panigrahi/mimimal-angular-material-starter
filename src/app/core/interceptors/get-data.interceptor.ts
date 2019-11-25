import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class GetDataInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // skip body code checks
                    if (
                        request.url.endsWith('check_duplicate_campname/') ||
                        request.url.endsWith('route/change_route/campaign') ||
                        request.url.endsWith('route/change_route/user') ||
                        request.url.endsWith('route/display_route_details') ||
                        request.url.endsWith('route/move_channels') ||
                        request.url.endsWith('route/delete_route')
                    ) {
                        return event;
                    }

                    const endpoint = request.url.slice(
                        request.url.lastIndexOf('/') + 1
                    );

                    let body;

                    if (
                        request.method === 'GET' &&
                        ['company', 'product', 'feature', 'module'].includes(
                            endpoint
                        )
                    ) {
                        body = {
                            records: event.body.data,
                            totalRecords: event.body.data.length,
                            filteredRecords: event.body.data.length
                        };
                    } else {
                        body = event.body.data;
                    }

                    return event.clone({ body });
                }

                return event;
            })
        );
    }
}
