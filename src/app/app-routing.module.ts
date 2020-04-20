import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: '', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) }, { path: 'lists', loadChildren: () => import('./lists/lists.module').then(m => m.ListsModule) }, { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) }, { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
