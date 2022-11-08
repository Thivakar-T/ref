import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VendorpurchasewiseService } from 'src/app/services/vendorpurchasewise.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
declare let $:any;

@Component({
  selector: 'app-vendor-list-wise-purchase',
  templateUrl: './vendor-list-wise-purchase.component.html',
  styleUrls: ['./vendor-list-wise-purchase.component.scss']
})
export class VendorListWisePurchaseComponent implements OnInit {

  vendorPurchase:any=[];
  result:any={};

  constructor(private service:VendorpurchasewiseService, private http:HttpClient, private toast:ToastrService,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    console.log('came to Vendor page');
   this. getVendorpurchaseList();
  }

  getVendorpurchaseList(){
    // this.spinner.show();
    $("#emplist").DataTable().clear().destroy();
    console.log('came to manager page');
    this.service.getAllVendorPurchaseList().subscribe((responce)=>{
      console.log(responce)
      this.vendorPurchase = responce;
      this.vendorPurchase=this.vendorPurchase.data
      this.spinner.hide();
      $(document).ready(function(){
        $("#emplist").DataTable({
          "iDisplayLength":30,
          "lengthMenu":[10,25,30,50,100]
        });
       });
    },
    (err) => {
      if (err.error.error.reason) {
        this.toast.error(err.error.error.reason);
        this.spinner.hide()
      }
    });
   
  }

delete(id:any){
  this.spinner.show();
  console.log(id);
  if(confirm("Do you want romove data")){
    this.service.deleteVendorPurchase(id).subscribe(responce=>{
      this.result= responce
     this.getVendorpurchaseList();
     this.spinner.hide();
     this.toast.success(this.result.data)
    });
  
}
}

}
