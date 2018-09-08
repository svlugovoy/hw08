import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosListComponent} from './components/todos-list/todos-list.component';
import {RoutingModule} from '../../routing.module';
import {AboutComponent} from './components/about/about.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TodoAddComponent} from './components/todo-add/todo-add.component';
import {TodoEditComponent} from './components/todo-edit/todo-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TodosListComponent,
    AboutComponent,
    NotFoundComponent,
    TodoAddComponent,
    TodoEditComponent
  ],
  providers: [],
  exports: [
    TodosListComponent,
    AboutComponent,
    NotFoundComponent,
    TodoAddComponent,
    TodoEditComponent
  ]
})
export class HomeModule { }
