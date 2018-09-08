import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';


@Injectable()
export class AuthService {

  private auth_url = environment.auth_url;

  private _token: string;
  private _name: string;

  constructor(
    private http: HttpClient
  ) { }

  public get isAuth() {
    return this._token || localStorage.getItem('token');
  }

  private set token(token) {
    this._token = token;
    localStorage.setItem('token', token);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(`${this.auth_url}/login`, {email, password}, {responseType: 'text'})
      .pipe(map( (resp: string): boolean => {
        console.log(resp);
        this.token = resp;
        return true;
      }));
  }

  logout() {

    this._token = null;
    localStorage.removeItem('token');

    return of(true);
  }

  getNameByToken(token: string): Observable<any> {
    return this.http.post(`${this.auth_url}/verify`, {token}, {responseType: 'text'});
  }

  register(email: string, name: string, password: string): Observable<boolean> {
    return this.http.post(`${this.auth_url}/signup`, {email, name, password}, {responseType: 'text'})
      .pipe(map( (resp: string): boolean => {
        console.log(resp);
        this.token = resp;
        return true;
      }));
  }
}
