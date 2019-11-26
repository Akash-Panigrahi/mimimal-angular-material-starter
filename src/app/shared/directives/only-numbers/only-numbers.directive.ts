import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[hotpOnlyNumbers]'
})
export class OnlyNumbersDirective {
    @HostListener('keydown', ['$event'])
    private _keydownEvent(e: KeyboardEvent) {
        if (
            ['-', '+', 'e', '.'].includes(e.key) &&
            (e.target as HTMLInputElement).type === 'number'
        ) {
            e.preventDefault();
        }
    }
}
