import { Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarRef,
    MatSnackBarConfig
} from '@angular/material';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable()
export class ToastService {
    constructor(private _matSnackBar: MatSnackBar) {}

    open(
        message: string,
        status: string,
        canClose: boolean,
        config: ToastConfig
    ): ToastRef {
        return this._matSnackBar.openFromComponent(ToastComponent, {
            data: { message, status, canClose },
            ...config
        });
    }

    success(
        message: string,
        canClose?: boolean,
        config?: ToastConfig
    ): ToastRef {
        return this.open(message, 'success', canClose, config);
    }

    error(message: string, canClose?: boolean, config?: ToastConfig): ToastRef {
        return this.open(message, 'error', canClose, config);
    }

    warning(
        message: string,
        canClose?: boolean,
        config?: ToastConfig
    ): ToastRef {
        return this.open(message, 'warning', canClose, config);
    }

    info(message: string, canClose?: boolean, config?: ToastConfig): ToastRef {
        return this.open(message, 'info', canClose, config);
    }
}

export type ToastRef = MatSnackBarRef<ToastComponent>;
export type ToastConfig = MatSnackBarConfig;
