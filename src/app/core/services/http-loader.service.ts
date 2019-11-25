import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class HttpLoaderService {
    private _loaderSubject = new BehaviorSubject<boolean>(false);

    start(): void {
        this._loaderSubject.next(true);
    }

    complete(): void {
        this._loaderSubject.next(false);
    }

    getLoader(): Observable<boolean> {
        return this._loaderSubject.asObservable();
    }
}
