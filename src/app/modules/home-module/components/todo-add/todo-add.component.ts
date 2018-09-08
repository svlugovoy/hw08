import {Component, OnInit} from '@angular/core';
import {Todo} from '../../../../models/todo';
import {TodoService} from '../../../../services/todo.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {DataExchangeService} from '../../../../services/data-exchange.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private dataExchangeService: DataExchangeService,
    private router: Router,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      completed: new FormControl(false, [Validators.required, Validators.pattern('^(true|false)$')])
    });
  }

  onAddNewTodo() {
    const newTodo: Todo = {
      userId: 1,
      title: this.addForm.value.title,
      completed: this.addForm.value.completed
    };
    console.log(newTodo);
    this.spinner.show();
    this.todoService.createTodo(newTodo).subscribe((resp) => {
        this.dataExchangeService.emitAddTodoEvent(resp);
        this.router.navigate(['/']);
        this.toastr.success('Todo created.', 'Created!');
      },
      (error) => {
        this.toastr.error(error.message, 'Error!');
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      });

  }

  onCancel() {
    this.addForm.reset();
  }

}
