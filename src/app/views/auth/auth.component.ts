import { Component, OnInit } from '@angular/core';
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
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
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
export class AuthComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
