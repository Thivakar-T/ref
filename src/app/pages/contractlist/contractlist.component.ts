import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
// import {ContractComponent } from 'src/app/services/contract.component';
import{first} from 'rxjs/operators';
import{Observable} from 'rxjs';
import { ContractService } from 'src/app/services/contract.service';
import { DeclareVarStmt } from '@angular/compiler';
import { VendorDetailsComponent } from '../vendor-details/vendor-details.component';


declare let $: any;

@Component({
  selector: 'app-contractlist',
  templateUrl: './contractlist.component.html',
  styleUrls: ['./contractlist.component.scss']
})
export class ContractlistComponent implements OnInit {
   
    contractor:any;
    contractlist!:[];
 
    constructor(private service:ContractService,private Http:HttpClient){}

    ngOnInit(): void {
      $('#contractlist').DataTable().clear().destroy();
      console.log('came to contract page')
      this.service.getContractorid().subscribe((res:any) => {
        this.contractor=res;
        this.contractlist=this.contractor.data;
        console.log(res);
        $('#contractlist').DataTable({
          'iDisplayLength':30,
          "lengthMenu": [10, 25, 30, 50, 100]
        });
      });      
    }
    
    delete(id:any){
      console.log(id);
      if (confirm("Do you want to remove data")){
        this.service.deletecontract(id).subscribe((data:any) => {
          this.ngOnInit();
  
    });
  }
}
}




