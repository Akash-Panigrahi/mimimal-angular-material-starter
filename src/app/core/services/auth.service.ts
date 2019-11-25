import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {
    constructor(private _storageService: StorageService) {}

    isAuthenticated(): boolean {
        return !!this._storageService.getItem('token');
    }
}
