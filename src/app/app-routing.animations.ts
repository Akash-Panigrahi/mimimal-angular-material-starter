import {
    sequence,
    trigger,
    animate,
    style,
    group,
    transition,
    animateChild
} from '@angular/animations';

import { queryOn } from './core/utils';

export const appRoutingAnimation = trigger('appRoutingAnimation', [
    transition('* => *', [
        queryOn(
            ':enter, :leave',
            style({
                position: 'fixed',
                width: '100%',
                height: '100%'
            })
        ),

        queryOn(
            ':enter',
            style({
                transform: 'translateX(100%)'
            })
        ),

        sequence([
            queryOn(':leave', animateChild()),
            group([
                queryOn(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('500ms', style({ transform: 'translateX(-100%)' }))
                ]),
                queryOn(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('500ms', style({ transform: 'translateX(0%)' }))
                ])
            ]),
            queryOn(':enter', animateChild())
        ])
    ])
]);
