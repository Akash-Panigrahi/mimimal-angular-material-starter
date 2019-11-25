import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';

@Injectable()
export class ApiErrorHandlerService {
    constructor(private _toastService: ToastService, private _router: Router) {}

    handleError(err: any): void {
        if (!environment.production) {
            this.logError(err);
        }

        const { code: status, data } = err.body;
        const { message } = data;

        switch (status) {
            case 0:
                this.handle0(message);
                break; // Unknown Error
            case 4000:
                this.handle4000(message);
                break; // Bad Request
            case 4001:
                this.handle4001(message);
                break; // Unauthorized
            case 4003:
                this.handle4003(message);
                break; // Forbidden
            case 4004:
                this.handle4004(message);
                break; // Not Found
            case 5000:
                this.handle5000(message);
                break; // Internal Server Error
        }
    }

    handle0(message: string): void {
        this._toastService.error(message);
    }

    handle4000(message: string): void {
        this._toastService.warning(message);
    }

    handle4001(message: string): void {
        this._toastService.warning(message, false, { duration: 3500 });
        // .afterDismissed()
        // .pipe(take(1))
        // .subscribe(() => {
        //     this._logout.logout();
        // });
    }

    handle4003(message: string): void {
        this._toastService.error(message);
    }

    handle4004(message: string): void {
        this._toastService.warning(message);
    }

    handle5000(message: string): void {
        // this._router.navigateByUrl('/500');
        this._toastService.warning(message);
    }

    logError(err: HttpResponse<any>): void {
        console.group(`${err.body.code} -> ${err.body.data.message}`);
        console.log('URL:', err.url);
        console.log(err);
        console.groupEnd();
    }
}
