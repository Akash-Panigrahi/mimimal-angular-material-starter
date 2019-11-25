import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
    constructor(private _http: HttpClient) {}

    private _prepareParams(params: any): HttpParams {
        return new HttpParams({
            fromObject: params
        });
    }

    getUrl(): string {
        return environment.baseUrl;
    }

    // using T to return custom type
    post<T>(endpoint: string, data: object, headers?: any): Observable<any> {
        return this._http.post<T>(this.getUrl() + endpoint, data, {
            headers
        });
    }

    // using T to return custom type
    postJson<T>(endpoint: string, data: object): Observable<T> {
        return this.post<T>(endpoint, data, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });
    }

    // using T to return custom type
    put<T>(endpoint: string, data: object): Observable<T> {
        return this._http.put<T>(`${this.getUrl() + endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });
    }

    // using T to return custom type
    get<T>(endpoint: string, params?: object): Observable<T> {
        return this._http.get<T>(this.getUrl() + endpoint, {
            params: this._prepareParams(params)
        });
    }

    getSoundFileURL(endpoint: string, params: string): string {
        return `${this.getUrl() + endpoint}/${params}`;
    }

    getCSVFile(endpoint: string, params: object): Observable<any> {
        return this._http
            .get(this.getUrl() + endpoint, {
                params: this._prepareParams(params),
                responseType: 'text' as 'json',
                observe: 'response'
            })
            .pipe(
                map(res => ({
                    filename: res.headers
                        .get('content-disposition')
                        .split('=')[1]
                        .replace(/\"/g, ''),
                    data: res.body
                }))
            );
    }
}
