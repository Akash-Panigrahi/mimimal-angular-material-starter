import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'swp-internal-server-error',
    templateUrl: './internal-server-error.component.html',
    styleUrls: ['./internal-server-error.component.scss']
})
export class InternalServerErrorComponent implements OnInit {
    @HostBinding('class.internal-server-error')
    private _staticClass = true;

    constructor() {}

    ngOnInit() {}
}
