import { Component, OnInit, HostBinding } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
    selector: 'hotp-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
    @HostBinding('class') status: string;
    message: string;
    canClose = false;

    statusIcons = [
        {
            status: 'success',
            icon: 'check_circle'
        },
        {
            status: 'error',
            icon: 'cancel'
        },
        {
            status: 'warning',
            icon: 'warning'
        },
        {
            status: 'info',
            icon: 'info'
        }
    ];

    constructor(private _matSnackBarRef: MatSnackBarRef<ToastComponent>) {}

    ngOnInit() {
        const {
            data,
            duration
        } = this._matSnackBarRef.containerInstance.snackBarConfig;

        this.status = data.status;
        this.message = data.message;
        this.canClose = data.canClose;

        if (!this.canClose && !duration) {
            setTimeout(() => this._matSnackBarRef.dismiss(), 2000);
        }
    }

    getIcon(status: string): string {
        return this.statusIcons.find(statusIcon => statusIcon.status === status)
            .icon;
    }

    closeToast(): void {
        this._matSnackBarRef.dismiss();
    }
}
