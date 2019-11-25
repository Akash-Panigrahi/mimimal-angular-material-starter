import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveStorageService } from './reactive-storage.service';

@Injectable()
export class LogoutService {
    constructor(
        private _router: Router,
        private _reactiveStorageService: ReactiveStorageService
    ) {}

    logout() {
        // clear the storage
        this._reactiveStorageService.clear();

        // redirect to '/login' which will then redirect to login page
        this._router.navigateByUrl('/login');
    }
}
