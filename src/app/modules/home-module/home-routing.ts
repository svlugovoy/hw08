import {Routes} from '@angular/router';

import {TodosListComponent} from './components/todos-list/todos-list.component';
import {AboutComponent} from './components/about/about.component';
import {AuthGuard} from '../../guards/auth.guard';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {TodoAddComponent} from './components/todo-add/todo-add.component';
import {TodoEditComponent} from './components/todo-edit/todo-edit.component';

export const homeRouts: Routes = [
  {path: '', component: TodosListComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'add', component: TodoAddComponent, canActivate: [AuthGuard]},
  {path: 'todos/:id', component: TodoEditComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];
