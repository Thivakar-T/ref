import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl = environment.API_URL;
  private _login = this._baseUrl + '/auth/login';
  private reg =  this._baseUrl + '/api/workers/getemployeeList';

  constructor(private http: HttpClient, private router: Router) {}


  Login(logindata: any) {
    
    console.log(logindata);
    return this.http.post(this._login, logindata);
  }

  IsLoggedIn() {
    return localStorage.getItem('jwt') != null;
  }

  getemloyee(){
    return this.http.get(this.reg);
  }

  public currentUser() {
    return localStorage.getItem('currentUser');
  }

  public getToken() {
    return localStorage.getItem('token');
  }
  public getId() {
    return localStorage.getItem('id');
  }

  public getName() {
    return localStorage.getItem('name');
  }

  public getRole() {
    return localStorage.getItem('role');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    this.router.navigateByUrl('/');
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }


}
