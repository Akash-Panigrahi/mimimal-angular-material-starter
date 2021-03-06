import { Injectable } from '@angular/core';

@Injectable()
export class ModuleAlreadyLoadedGuard {
    throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
        if (parentModule) {
            throw new Error(
                `${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`
            );
        }
    }
}
