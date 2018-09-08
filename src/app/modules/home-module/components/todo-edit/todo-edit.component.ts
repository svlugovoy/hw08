import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../../services/todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Todo} from '../../../../models/todo';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {

  editForm: FormGroup;

  todoId: number;
  todo: Todo;
  isReadOnly = true;

  constructor(
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      title: new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(3)]),
      completed: new FormControl({value: false, disabled: true}, [Validators.required, Validators.pattern('^(true|false)$')])
    });
    this.spinner.show();
    this.todoId = this.activatedRoute.snapshot.params['id'];
    this.todoService.getTodoById(this.todoId).subscribe((resp: Todo) => {
        this.todo = resp;
        this.editForm.get('title').setValue(resp.title);
        this.editForm.get('completed').setValue(resp.completed);
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
    this.spinner.show();
    this.isReadOnly = true;
    this.editForm = new FormGroup({
      title: new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(3)]),
      completed: new FormControl({value: false, disabled: true}, [Validators.required, Validators.pattern('^(true|false)$')])
    });
    this.todoService.getTodoById(this.todoId).subscribe((resp: Todo) => {
        this.todo = resp;
        this.editForm.get('title').setValue(resp.title);
        this.editForm.get('completed').setValue(resp.completed);
        this.isReadOnly = true;
        this.toastr.info('Update is canceled.', 'Canceled!');
      },
      (error) => {
        this.toastr.error(error.message, 'Error!');
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      });
  }

  onEdit() {
    this.spinner.show();
    const updatedTodo = {
      title: this.editForm.value.title,
      completed: this.editForm.value.completed,
      userId: this.todo.userId,
      id: this.todo.id
    };
    this.todoService.editTodo(updatedTodo).subscribe((resp: Todo) => {
        this.router.navigate(['/']);
        this.toastr.success('Post updated. ' + JSON.stringify(resp), 'Updated!');
      },
      (error) => {
        if (this.todoId > 200) {
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

  switchReadOnly() {
    this.isReadOnly = false;
    this.editForm.get('title').enable();
    this.editForm.get('completed').enable();
  }
}
