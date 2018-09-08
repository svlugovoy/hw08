import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../../services/todo.service';
import {Todo} from '../../../../models/todo';
import {DataExchangeService} from '../../../../services/data-exchange.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  todos: Todo[];

  todosCount: number;

  todo: Todo = {
    userId: 1,
    title: '',
    completed: false
  };

  constructor(
    private todoService: TodoService,
    private dataExchangeService: DataExchangeService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.dataExchangeService.addTodoEvent.subscribe((data: Todo) => {
      this.todo = data;
    });
    this.spinner.show();
    this.todoService.getTodos().subscribe((data: Todo[]) => {
        this.todos = data;
        if (this.todo.id) {
          this.todos.unshift(this.todo);
        }
        this.todosCount = this.todos.length;
        this.dataExchangeService.changeTodosCount(this.todosCount);
      },
      (error) => {
        this.toastr.error(error.message, 'Error!');
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      });
  }

  onDelete(id: number) {
    this.spinner.show();
    this.todoService.deleteTodo(id).subscribe((resp: Object) => {
        this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
        this.todosCount = this.todos.length;
        this.dataExchangeService.changeTodosCount(this.todosCount);
        this.toastr.success('Post deleted.', 'Deleted!');
      },
      (error) => {
        if (id > 200) {
          this.toastr.error('Not implemented. Fake server!', 'Error!');
        } else {
          this.toastr.error(error.message, 'Error!');
        }
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      });
  }
}
