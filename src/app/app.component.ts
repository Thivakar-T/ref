import { Component, OnInit } from '@angular/core';
import { Route, Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from './services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'construction-management';
  constructor(private toastr: ToastrService,private AuthService:AuthService) {}

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
   ngOnInit(): void {
  }
  submit(){
  console.log("hai")
  this.AuthService.getemloyee().pipe(first()).subscribe((responce:any)=>{
    console.log(responce)

  })
  }
}