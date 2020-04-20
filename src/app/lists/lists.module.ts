import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';
import { UpdateListComponent } from '../lists/update-list/update-list.component';


@NgModule({
  declarations: [ListsComponent, UpdateListComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ListsModule { }
