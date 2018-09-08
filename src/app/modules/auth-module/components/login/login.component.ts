import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {DataExchangeService} from '../../../../services/data-exchange.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private dataExchangeService: DataExchangeService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.auth.isAuth) {
      this.router.navigate(['/']);
    }
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe( (resp: boolean) => {
      if (resp) {
        this.router.navigate(['/']);
        this.dataExchangeService.emitIsAuthEvent(true);
        this.dataExchangeService.emitCurrentUserEvent(this.loginForm.value.email);
      }
    },
      (error) => {
        this.toastr.error(error.error, 'Error!');
      });
  }

  onBlur(name: string) {
    if (this.loginForm.get(name).invalid) {
      console.log('input', name, 'invalid');
      this.toastr.error('Password must be >= 8 symbols', 'Error!');
    }
  }
}
