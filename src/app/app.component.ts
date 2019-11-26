import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, delay, takeUntil } from 'rxjs/operators';

import { appRoutingAnimation } from './app-routing.animations';
import { HttpLoaderService } from './core/services/http-loader.service';

@Component({
    selector: 'hotp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [appRoutingAnimation]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    loader$: Observable<boolean>;
    private _destroy$ = new Subject<void>();

    constructor(
        private _title: Title,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _httpLoaderService: HttpLoaderService
    ) {}

    ngOnInit() {
        this._changePageTitle();
    }

    ngAfterViewInit() {
        this.loader$ = this._httpLoaderService.getLoader().pipe(delay(0));
    }

    private _changePageTitle() {
        this._router.events
            .pipe(
                takeUntil(this._destroy$),
                filter(e => e instanceof NavigationEnd),
                map(() => {
                    let route = this._activatedRoute.firstChild;
                    let child = route;

                    while (child) {
                        if (child.firstChild) {
                            child = child.firstChild;
                            route = child;
                        } else {
                            child = null;
                        }
                    }

                    return route;
                }),
                mergeMap(route => route.data)
            )
            .subscribe(({ title }) => {
                this._title.setTitle('Helo OTP ' + (title ? '| ' + title : ''));
            });
    }

    ngOnDestroy() {
        this._destroy$.complete();
    }
}
