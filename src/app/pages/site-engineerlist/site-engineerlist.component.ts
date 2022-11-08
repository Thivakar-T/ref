import { Component, OnInit } from '@angular/core';
import {ToastrService}from'ngx-toastr';
import {SiteEngineerService} from'src/app/services/site-engineer.service';
import { HttpClient } from '@angular/common/http';
import { SiteEngineerComponent } from '../site-engineer/site-engineer.component';
import { first } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { data } from 'jquery';
declare let $: any;

@Component({
  selector: 'app-site-engineerlist',
  templateUrl: './site-engineerlist.component.html',
  styleUrls: ['./site-engineerlist.component.scss']
})
export class SiteEngineerlistComponent implements OnInit {

  siteengineer:any;
  siteEngineerList!:[];

  constructor(private service:SiteEngineerService,private http:HttpClient) { }

  ngOnInit(): void {
    $('#engineerlist').DataTable().clear().destroy();
    console.log('came to SiteEngineer page')
    this.service.getSiteengineer().subscribe((res: any) => {
             this.siteengineer=res;
             this.siteEngineerList=this.siteengineer.data;
             console.log(res);
             $('#engineerlist').DataTable({
              "iDisplayLength":30,
              "lengthMenu": [10, 25, 30, 50, 100]
            });
          });      
  }
  delete(id:any) {
    console.log(id);
    if (confirm("Do you want to remove data")){
      this.service.delete(id).subscribe(data=>{
        this.ngOnInit();
      });
    }
   }
 
}
