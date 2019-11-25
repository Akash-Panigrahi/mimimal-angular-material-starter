import { Component } from '@angular/core';

@Component({
    selector: 'hotp-root',
    template: `
        <router-outlet></router-outlet>
    `,
    styles: [
        `
            :host {
                display: flex;
                height: inherit;
                width: inherit;
            }
        `
    ]
})
export class AppComponent {}
