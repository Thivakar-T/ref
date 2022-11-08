import { Component, OnInit } from '@angular/core';
import { CreatemanagerService } from 'src/app/services/createmanager.service';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
declare let $: any;

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss'],
})
export class ManagerListComponent implements OnInit {
  managers: any = [];
  result:any = {};

  constructor(
    private http: HttpClient,
    private service: CreatemanagerService,
    public toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner:NgxSpinnerService
  ) {}

  ngOnInit(): void {
    console.log('came to manager page');
    this.getMangerList();
  }

  getMangerList() {
  this.spinner.show()
    $('#emplist').DataTable().clear().destroy();
    this.service
      .getManager()
      .pipe(first())
      .subscribe(
        (responce) => {
          console.log(responce);
          this.managers = responce;
          this.managers = this.managers.data;
          console.log(this.managers);
    this.spinner.hide()
          $(document).ready(function () {
            $('#emplist').DataTable({
              iDisplayLength: 30,
              lengthMenu: [10, 25, 30, 50, 100],
            });
          });
        },
        (err) => {
          if (err.error.error.reason) {
            this.toast.error(err.error.error.reason);
            this.spinner.hide()
          }
        }
      );
  }
  delete(id: any) {
  
    console.log(id);
    if (confirm('Do you want romove data')) {
      this.spinner.show()
      this.service.deleteManagerById(id).subscribe((responce) => {
        this.getMangerList();
        this.result= responce;
        this.spinner.hide()
        this.toast.success(this.result.data)
      },
      (err) => {
        if (err.error.error.reason) {
          this.toast.error(err.error.error.reason);
          this.spinner.hide()
        }
      });
    }
  }
}
