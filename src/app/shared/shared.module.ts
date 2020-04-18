import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightmenuComponent } from '../rightmenu/rightmenu.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [ RightmenuComponent ],
  exports:[
    RightmenuComponent
  ]
})
export class SharedModule { }
