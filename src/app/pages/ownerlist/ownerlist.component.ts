import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ToasterService } from "@angu/toastr/ToastrService";
import { OwnerService } from "src/app/services/owner.service";
import { OwnerComponent } from '../owner/owner.component';
import { first } from "rxjs/operators";
import {  observable} from "rxjs";
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

declare let $:any;
@Component({
  selector: 'app-ownerlist',
  templateUrl: './ownerlist.component.html',
  styleUrls: ['./ownerlist.component.scss']
})
export class OwnerlistComponent implements OnInit {
  owner:any;
  ownerlist!:[];
 constructor(private http:HttpClient,private service:OwnerService) { }

  ngOnInit(): void {
    // $("#ownerlist").datatable().clear().destory();
    // console.log('came to owner page');
    // this.service.getowner().subscribe((Response:any) =>{
    //   console.log(Response)
    //   this.owner=Response;
    //   this.ownerlist=this.owner.data;
    //   console.log(this.ownerlist);
    //   $("#ownerlist").DataTable({
    //     "iDisplayLength":30,"lengthMenu":[10,25,30,50,100]
    //   });
    // });
}

}
