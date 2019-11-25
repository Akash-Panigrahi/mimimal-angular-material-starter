import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[swpPreventPaste]'
})
export class PreventPasteDirective {
    @HostListener('paste', ['$event'])
    private _pasteEvent(e: ClipboardEvent) {
        e.preventDefault();
    }
}
