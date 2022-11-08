import { Component, OnInit } from '@angular/core';
import { SitecreationService } from 'src/app/services/sitecreation.service';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
declare let $: any;


@Component({
  selector: 'app-site-creation-list',
  templateUrl: './site-creation-list.component.html',
  styleUrls: ['./site-creation-list.component.scss']
})
export class SiteCreationListComponent implements OnInit {
  sites:any=[];
  result:any = {};

  constructor(private service:SitecreationService,  public toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getSiteCreationList() 
  }
  getSiteCreationList() {
    this.spinner.show();
    $('#emplist').DataTable().clear().destroy();
    this.service.getSiteCreation().pipe(first()).subscribe((responce)=>{
      console.log(responce);
      this.sites = responce;
      this.sites = this.sites.data;
      console.log(this.sites);
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
      }
    }
  );
    
  }
delete(id:any, status:any){
  this.spinner.show();
  console.log(id);
  if (confirm('Do you want romove data')) {
    this.service.deleteSiteCreationById(id,status).subscribe((responce) => {
      this.getSiteCreationList();
      this.result= responce;
      this.spinner.hide();
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