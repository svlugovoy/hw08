import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

import {homeRouts} from './modules/home-module/home-routing';
import {authRouts} from './modules/auth-module/auth-routing';

const routes: Routes = [
  {path: 'auth', children: [...authRouts]},
  {path: '', children: [...homeRouts]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RoutingModule { }
