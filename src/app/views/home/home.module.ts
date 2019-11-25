import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [CommonModule, MaterialModule, SharedModule, HomeRoutingModule],
    declarations: [HomeComponent]
})
export class HomeModule {}
