import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

// Directives
import { OnlyNumbersDirective } from './directives/only-numbers/only-numbers.directive';
import { MaxNumbersTypeDirective } from './directives/max-numbers-type/max-numbers-type.directive';
import { PreventPasteDirective } from './directives/prevent-paste/prevent-paste.directive';

@NgModule({
    declarations: [
        OnlyNumbersDirective,
        MaxNumbersTypeDirective,
        PreventPasteDirective
    ],
    // declarations and imports needs to be exported to be used by other modules
    exports: [
        OnlyNumbersDirective,
        MaxNumbersTypeDirective,
        PreventPasteDirective
    ]
})
export class SharedModule {
    constructor() {
        if (!environment.production) {
            console.log('SharedModule loaded');
        }
    }
}
