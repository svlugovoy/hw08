import {Component, OnInit} from '@angular/core';
import {DataExchangeService} from '../../../../services/data-exchange.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

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
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern('[A-Za-z]*')]),
      password: new FormControl('', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[A-Z]).{8,})')])
    });
  }

  onSubmit() {
    console.log(this.registrationForm);
    if (this.registrationForm.invalid) {
      return;
    }
    this.auth.register(this.registrationForm.value.email, this.registrationForm.value.name, this.registrationForm.value.password)
      .subscribe( (resp: boolean) => {
        if (resp) {
          console.log(resp);
          this.router.navigate(['/']);
          this.dataExchangeService.emitIsAuthEvent(true);
          this.dataExchangeService.emitCurrentUserEvent(this.registrationForm.value.email);
        }
      },
      (error) => {
        this.toastr.error(error.error, 'Error!');
      });
  }

  onBlur(name: string) {
    if (this.registrationForm.get(name).invalid) {
      console.log('input', name, 'invalid');
      this.toastr.error(name + ' must be >= 8 symbols and contains at least 1 number and 1 UpperCase letter', 'Error!');
    }
  }

}
