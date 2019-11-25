import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
    imports: [CommonModule, MaterialModule, SharedModule, AuthRoutingModule],
    declarations: [AuthComponent]
})
export class AuthModule {}
