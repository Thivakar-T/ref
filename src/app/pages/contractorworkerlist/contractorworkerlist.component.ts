import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";
import { ContractWorkersService } from 'src/app/services/contract-workers.service';
import { ContractorworkersComponent  } from '../contractorworkers/contractorworkers.component';

import { first } from "rxjs/operators";
import {  observable} from "rxjs";
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
declare let $:any;

@Component({
  selector: 'app-contractorworkerlist',
  templateUrl: './contractorworkerlist.component.html',
  styleUrls: ['./contractorworkerlist.component.scss']
})
export class ContractorworkerlistComponent implements OnInit {
 
  contactorworker:any;
  contractorworkerlist!:[];
  constructor(private http:HttpClient,private service:ContractWorkersService) { }

  ngOnInit(): void {
    $("#emplist").DataTable().clear().destory();
    console.log('came to worker page');
    this.service.getcontractorworker().subscribe((Response:any) => {
      console.log(Response)
      this.contactorworker=Response;
      this.contractorworkerlist =this.contactorworker.data;
      console.log(this.contractorworkerlist);
        $("#emplist").DataTable({
          "iDisplayLength":30,"lengthMenu":[10,25,30,50,100]
        });
      });
    //   delete(id,data)
    //   if(confirm("Do you want romove data")){
    //     this.service.deleteWorker().subscribe(=>{
    //      this.ngOnInit();
    //     });
    
  }
}