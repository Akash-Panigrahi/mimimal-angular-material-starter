import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[hotpPreventPaste]'
})
export class PreventPasteDirective {
    @HostListener('paste', ['$event'])
    private _pasteEvent(e: ClipboardEvent) {
        e.preventDefault();
    }
}
