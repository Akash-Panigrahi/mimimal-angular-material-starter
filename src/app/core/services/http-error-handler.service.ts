import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogoutService } from './logout.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';

@Injectable()
export class HttpErrorHandlerService {
    constructor(
        private _toastService: ToastService,
        private _logout: LogoutService,
        private _router: Router
    ) {}

    handleError(err: HttpErrorResponse): void {
        if (!environment.production) {
            this.logError(err);
        }

        const errorMessage = (typeof err.error === 'string'
            ? JSON.parse(err.error)
            : err.error
        ).data.message;

        switch (err.status) {
            case 0:
                this.handle0();
                break; // Unknown Error
            case 400:
                this.handle400(errorMessage);
                break; // Bad Request
            case 401:
                this.handle401();
                break; // Unauthorized
            case 403:
                this.handle403();
                break; // Forbidden
            case 404:
                this.handle404(errorMessage);
                break; // Not Found
            case 429:
                this.handle429(errorMessage);
                break; // Too Many Requests
            case 500:
                this.handle500();
                break; // Internal Server Error
        }
    }

    handle0(): void {
        this._toastService.error('Some error occured! Please stay put.');
    }

    handle400(errorMessage: string): void {
        this._toastService.warning(errorMessage);
    }

    handle401(): void {
        this._toastService
            .warning(
                'You are not authorized to access this resource. Redirecting you to Login page.',
                true,
                { duration: 3500 }
            )
            .afterDismissed()
            .pipe(take(1))
            .subscribe(() => this._logout.logout());
    }

    handle403(): void {
        this._toastService.error(
            'You do not have permission to access this resource.'
        );
    }

    handle404(errorMessage: string): void {
        this._toastService.warning(errorMessage, true);
    }

    handle429(errorMessage: string): void {
        this._toastService.warning(errorMessage, true);
    }

    handle500(): void {
        this._router.navigateByUrl('/500');
    }

    logError(err: HttpErrorResponse): void {
        console.group(`${err.status} ${err.statusText}`);
        console.log('URL:', err.url);
        console.log(err);
        console.groupEnd();
    }
}
