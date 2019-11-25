import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeenIN from '@angular/common/locales/en-IN';

// Components
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToastComponent } from './components/toast/toast.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';

// Guards
import { ModuleAlreadyLoadedGuard } from './guards/module-already-loaded.guard';
import { NotLoggedInUserGuard } from './guards/not-logged-in-user.guard';

// Interceptors
import { ApiErrorInterceptor } from './interceptors/api-error.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { GetDataInterceptor } from './interceptors/get-data.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HttpLoaderInterceptor } from './interceptors/http-loader.interceptor';

// Modules
import { SharedModule } from '../shared/shared.module';

// Services
import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { LogoutService } from './services/logout.service';
import { ReactiveStorageService } from './services/reactive-storage.service';
import { ApiErrorHandlerService } from './services/api-error-handler.service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { LoggedInUserGuard } from './guards/logged-in-user.guard';
import { ToastService } from './services/toast.service';
import { MaterialModule } from '../material/material.module';
import { HttpLoaderService } from './services/http-loader.service';

// register indian english locale
registerLocaleData(localeenIN);

@NgModule({
    declarations: [
        PageNotFoundComponent,
        ToastComponent,
        InternalServerErrorComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        BrowserAnimationsModule,
        SharedModule,
        MaterialModule
    ],
    providers: [
        // 3rd Party Provides
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                panelClass: 'toast',
                verticalPosition: 'top',
                horizontalPosition: 'end'
            }
        },

        // Interceptors
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GetDataInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoaderInterceptor,
            multi: true
        },

        HttpErrorHandlerService,
        ApiErrorHandlerService,
        LogoutService,
        StorageService,
        ReactiveStorageService,
        AuthService,
        ApiService,
        ToastService,
        HttpLoaderService,

        // Guards
        NotLoggedInUserGuard,
        LoggedInUserGuard,
        ModuleAlreadyLoadedGuard
    ],
    entryComponents: [ToastComponent]
})
export class CoreModule {
    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule,
        private _moduleAlreadyLoadedGuard: ModuleAlreadyLoadedGuard
    ) {
        /*
            checking to see if module is already loaded.
            if yes, throw an error
        */
        this._moduleAlreadyLoadedGuard.throwIfAlreadyLoaded(
            parentModule,
            'CoreModule'
        );

        if (!environment.production) {
            console.log('CoreModule loaded');
        }
    }
}
