import { Directive, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[swpMaxNumbersType]'
})
export class MaxNumbersTypeDirective {
    @Input() max: number;

    @HostListener('keydown', ['$event'])
    private _keydownEvent(e: KeyboardEvent) {
        const target = e.target as HTMLInputElement;

        if (
            target.type === 'number' &&
            Number(target.value + e.key) > this.max
        ) {
            e.preventDefault();
        }
    }
}
