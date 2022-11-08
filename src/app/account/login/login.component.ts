import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  title = 'material-login';

  submitted = false;
  error = '';
  returnUrl: any;

  constructor(
    private router: Router,
    public toast: ToastrService,
    private service: AuthService,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private spinner:NgxSpinnerService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.spinner.show()
    console.log(this.loginForm.value);
    this.submitted = true;
    this.service.Login(this.loginForm.value).subscribe(
      (responce: any) => {
        console.log(responce);
        localStorage.setItem('currentUser', JSON.stringify(responce));
        localStorage.setItem('token', responce.data.jwt);
        localStorage.setItem('role', responce.data.role);
        localStorage.setItem('name', responce.data.name);
        localStorage.setItem('id', responce.data.status);
        this.toast.success(responce.data.message);
        this.router.navigateByUrl('/dashboard');
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.toast.error(error.error.error.message);
      }
    );
  }
}
