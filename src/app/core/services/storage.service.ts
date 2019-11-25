export class StorageService {
    private _storage = sessionStorage;

    getItem(key: string): any {
        return JSON.parse(this._storage.getItem(key));
    }

    setItem(key: string, value: any): void {
        this._storage.setItem(key, JSON.stringify(value));
    }

    removeItem(key: string): void {
        this._storage.removeItem(key);
    }

    clear(): void {
        this._storage.clear();
    }

    length(): number {
        return this._storage.length;
    }
}
