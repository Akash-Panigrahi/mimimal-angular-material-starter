import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class ReactiveStorageService {
    /*
        BehaviorSubject is a kind of Subject that allows to set initial value of stream.
        Subject allows for multicasting,
        so multiple components can listen to one data source.
    */
    private itemSources: Map<string, BehaviorSubject<any>> = new Map();

    constructor(private _storageService: StorageService) {
        addEventListener('storage', (event: StorageEvent) => {
            if (event.key) {
                if (this.itemSources.has(event.key)) {
                    this.itemSources
                        .get(event.key)
                        .next(JSON.parse(event.newValue));
                }
            }
        });
    }

    getItem(key: string): Observable<any> {
        // console.log(`storage ${this.itemSources.has(key) ? '' : 'does not '}has ${key} with value ${this._storageService.getItem(key)}`);

        if (!this.itemSources.has(key)) {
            this.itemSources.set(
                key,
                new BehaviorSubject<any>(this._storageService.getItem(key))
            );
        }

        // creating an observable from source for listening components to subscribe to
        return this.itemSources.get(key).asObservable();
    }

    setItem(key: string, value: any): void {
        // console.log(`setting ${key} in storage`);

        try {
            this._storageService.setItem(key, value);

            if (this.itemSources.has(key)) {
                this.itemSources
                    .get(key)
                    .next(this._storageService.getItem(key));
            }
        } catch (error) {
            this.itemSources.get(key).error(error);
        }
    }

    removeItem(key: string): void {
        this._storageService.removeItem(key);

        if (this.itemSources.has(key)) {
            this.itemSources.get(key).next(this._storageService.getItem(key)); // Expect to be null
            this.itemSources.delete(key);
        }
    }

    clear(): void {
        this._storageService.clear();
        this.itemSources.forEach((itemSource: BehaviorSubject<any>) => {
            // itemSource.next(null);
            itemSource.complete();
        });

        this.itemSources.clear();
    }
}
