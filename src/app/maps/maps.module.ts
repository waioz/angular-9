import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from '../shared/shared.module';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps.component';


@NgModule({
  declarations: [MapsComponent],
  imports: [
    SharedModule,
    CommonModule,
    MapsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5K8nt_fxmPeMLDicmqHMc27fJm3EAGXI'
    })
  ]
})
export class MapsModule { }
