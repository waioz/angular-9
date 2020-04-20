import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightmenuComponent } from '../rightmenu/rightmenu.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [ RightmenuComponent ],
  exports:[
    RightmenuComponent,
    FontAwesomeModule
  ]
})
export class SharedModule { }
