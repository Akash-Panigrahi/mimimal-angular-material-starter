import { Component } from '@angular/core';
import {
    trigger,
    transition,
    sequence,
    style,
    animateChild
} from '@angular/animations';
import { queryOn } from 'src/app/core/utils';

@Component({
    selector: 'hotp-auth',
    template: `
        <main [@authRoutingAnimation]="o.isActivated ? o.activatedRoute : ''">
            <router-outlet #o="outlet"></router-outlet>
        </main>
    `,
    styles: [
        `
            :host {
                display: flex;
                height: inherit;
                width: inherit;
            }
        `
    ],
    animations: [
        trigger('authRoutingAnimation', [
            transition('* => *', [
                queryOn(
                    ':enter, :leave',
                    style({
                        position: 'fixed',
                        width: '100%',
                        height: '100%'
                    })
                ),

                sequence([
                    queryOn(':leave', animateChild()),
                    queryOn(':enter', animateChild())
                ])
            ])
        ])
    ]
})
export class AuthComponent {}
