import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    imports: [CommonModule, MaterialModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
