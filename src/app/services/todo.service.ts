import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Todo} from '../models/todo';
import {environment} from '../../environments/environment';

@Injectable()
export class TodoService {

  private api_url = environment.api_url;

  constructor(
    private http: HttpClient
  ) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.api_url}/todos`);
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.api_url}/todos/${id}`);
  }

  deleteTodo(id: number): Observable<Object> {
    return this.http.delete<Object>(`${this.api_url}/todos/${id}`);
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.api_url}/todos`, todo);
  }

  editTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.api_url}/todos/${todo.id}`, todo);
  }

}
