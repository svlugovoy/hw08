import {Component, OnInit} from '@angular/core';
import {DataExchangeService} from '../../../../services/data-exchange.service';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {

  todosCount: number;
  isAuth: boolean;
  currentUser: string;

  constructor(
    private dataExchangeService: DataExchangeService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.dataExchangeService.currentTodosCount.subscribe( count => {
      this.todosCount = count;
    });
    this.dataExchangeService.isAuthEvent.subscribe( (data) => {
      this.isAuth = data;
    });
    if (localStorage.getItem('token')) {
      this.auth.getNameByToken(localStorage.getItem('token')).subscribe( (name) => {
        this.currentUser = name;
      });
    }
    this.dataExchangeService.currentUserEvent.subscribe( (name) => {
      this.currentUser = name;
    });
  }

  onLogout() {
    this.auth.logout();
    this.dataExchangeService.emitIsAuthEvent(false);
    this.dataExchangeService.emitCurrentUserEvent('');
  }
}
