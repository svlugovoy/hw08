import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutingModule} from '../../routing.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LeftmenuComponent} from './components/leftmenu/leftmenu.component';
import {FooterComponent} from './components/footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    RoutingModule
  ],
  declarations: [
    NavbarComponent,
    LeftmenuComponent,
    FooterComponent
  ],
  providers: [],
  exports: [
    NavbarComponent,
    LeftmenuComponent,
    FooterComponent
  ]
})
export class NavModule {
}
