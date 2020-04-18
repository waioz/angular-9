import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NgxImageCompressService} from 'ngx-image-compress';

import { ListsComponent } from './lists.component';
import { UpdateListComponent } from '../lists/update-list/update-list.component';

const routes: Routes = [
  { path: '', component: ListsComponent },
  { path: 'add', component: UpdateListComponent },
  { path: 'edit/:id', component: UpdateListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [NgxImageCompressService]
})
export class ListsRoutingModule { }
