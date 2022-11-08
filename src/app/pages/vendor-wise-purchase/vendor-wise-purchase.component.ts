import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ToastNoAnimationModule, ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/address.service';
import { VendorpurchasewiseService } from 'src/app/services/vendorpurchasewise.service';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { SitecreationService } from 'src/app/services/sitecreation.service';
import { CreatemanagerService } from 'src/app/services/createmanager.service';
import { MasterService } from 'src/app/services/master.service';
import { VendorService } from 'src/app/services/vendor.service';
declare let $: any;

@Component({
  selector: 'app-vendor-wise-purchase',
  templateUrl: './vendor-wise-purchase.component.html',
  styleUrls: ['./vendor-wise-purchase.component.scss']
})
export class VendorWisePurchaseComponent implements OnInit {

  vendorPurchaseForm: FormGroup | any;
  submitted = false;
  error = '';
  index: any;
  Sitenames: any = [];
  mango:any=[];
  orange:any=[];
  OwnerNameList: any = [];
  ProjectManagerList:any = [];
  SiteEngineerList:any = [];
  SiteNameList:any = [];
  OwnerObj:any={};
  sidenameObj:any={};
  sidefulllistObj:any={};
  sideplaceObj:any;
  address:any;
  addressObj:any;
  UOMlist:any =[];
  materiallist:any=[];
  vendornameList:any=[];
  vendornameListArr:any=[];
  UOMnameslist:any=[];
  UOMnameslistArr:any=[];
  VendorPurchaseList:any={};
  // vendorPurchaseMaterialList:any={};

  editdata: any;
  result: any;
  id: any;
  vendorPurchaseid: any;
  vendorPurchaseObj: any = {};
  vendors = [];
  matArr:any=[];
items:any=[];
  grantTotal=0;


  constructor(    private formBuilder: FormBuilder,
    
    private route: ActivatedRoute,
    public toast: ToastrService,
    private router: Router,
    private service: VendorpurchasewiseService,
    private sitecreationservice:SitecreationService,
    private managerservice:CreatemanagerService,
    private masterService: MasterService,
    private vendorservice:VendorService,
    private addressService: AddressService,
    private spinner:NgxSpinnerService) {
      this.vendorPurchaseid = this.route.snapshot.paramMap.get('id');
      if (this.vendorPurchaseid != null) {
        this.getVendorPurchaseByCode(this.vendorPurchaseid);
      }
     }

  ngOnInit(): void {
    this.vendorPurchaseForm =  this.formBuilder.group({
      purchaseNo: ['',Validators.required],
      siteName: [null,Validators.required],
      siteId:[null,Validators.required],
      sitePlace: ['',Validators.required],
      ownerId: [null, Validators.required],
      ownerName: ['', Validators.required],
      ownerPhoneNumber: ["",Validators.required, [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.minLength(10)]],
      ownerAddress: ['', Validators.required],
      projectManagerId: [null, Validators.required],
      siteEngineerId: [null, Validators.required],
      grantTotal:0,
      note:['', Validators.required],
      id: [''],
      vendorPurchaseMaterialList: this.formBuilder.array(
        [this.vendorPurchaseMaterialList()],
       
      ),
    });
    // this.getTotal(this.index)
    
    
    // const result = this.vendorPurchaseMaterialList.reduce((accumulator:any, obj:any) => {
    //   return accumulator + obj.totalAmount;
    // }, 0);
    
    // console.log(result); 

    
    this.getUOMList();
    this.getvendorList();
    this.getMasterList();
    this.getOwnerByList();
    this.getProjectManagerList();
    this.getSiteEnginnerByList();
    this.getSiteNameByList();
    this.getOwnerDetail(this.OwnerNameList.id);
    // this.getsiteDetail(this.SiteNameList.id);
  
  }
  vendorPurchaseMaterialList() {
    return this.formBuilder.group({
      materialId: [null, [Validators.required]],
      vendorId:[null, [Validators.required]],
      quantity: ['',Validators.required],
      uomId:[null, [Validators.required]],
      purchaseAmount: ['',Validators.required],
      totalAmount: ['',Validators.required],
      id: ['']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.vendorPurchaseForm.controls;
  }
  get vendorWiseList(): FormArray {
    return (<FormArray>this.vendorPurchaseForm.get('vendorPurchaseMaterialList')) as FormArray;
  }

  getSum(): number {
    let sum = 0;
    for (let i = 0; i < this.items.length; i++) {
      sum += this.items[i].num1;
    }
    return sum;
  }

  addItem() {
    console.log(this.vendorWiseList);
    let order = this.vendorPurchaseMaterialList();
    console.log('oder' + order);
    this.vendorWiseList.push(order);
    console.log(order);
  }
  delete(index:any) {
    console.log(this.vendorWiseList)
    this.vendorWiseList.removeAt(index);
    console.log(index)
    this.vendorPurchaseForm.value.vendorPurchaseMaterialList[index].status="INACTIVE";
    console.log(this.vendorPurchaseForm.value.vendorPurchaseMaterialList[index].status)
    console.log(this.vendorWiseList)
  
  }
 
//------------owner information------------------

  getOwnerDetail(id:any){
    console.log("hello");
    this.sitecreationservice
  . getOwenerById(id.id)
  .pipe(first())
  .subscribe(
    (responce) => {
      console.log(responce);
      this.OwnerObj = responce;
      this.OwnerObj=this.OwnerObj.data
      let address=this.OwnerObj.addressLine1 +","+ this.OwnerObj.addressLine2 
      // let city=this.OwnerObj.cityId
this.addressObj=address

      console.log("this is address"+this.addressObj)
      $(document).ready(function () {});
    },
    (err) => {
      if (err.error.error.reason) {
        this.toast.error(err.error.error.reason);
        this.spinner.hide()
      }
    });
  }

  getOwnerByList(){
    console.log("ownerlit")
    this.sitecreationservice
    .getOwnerFullList()
    .pipe(first())
    .subscribe(
      (responce) => {
        console.log("res"+responce)
        this.OwnerNameList = responce.data;
        console.log(responce)
        $(document).ready(function () {});
      },
      (err) => {
        if (err.error.error.reason) {
          this.toast.error(err.error.error.reason);
          this.spinner.hide()
        }
      });
  }

  //----------project manager information--------------

  getProjectManagerList(){
    this.managerservice
    .getManager()
    .pipe(first())
    .subscribe(
      (responce) => {
        console.log("projectmanager"+responce)
        this.ProjectManagerList = responce.data;
        console.log(responce)
        $(document).ready(function () {});
      },
      (err) => {
        if (err.error.error.reason) {
          this.toast.error(err.error.error.reason);
          this.spinner.hide()
        }
      });
}
//---------------site engineer information-----------------

getSiteEnginnerByList(){
  this.sitecreationservice
  .getSiteEngineerFullList()
  .pipe(first())
  .subscribe(
    (responce) => {
      console.log(responce)
      this.SiteEngineerList = responce.data;
      console.log(responce)
      $(document).ready(function () {});
    },
    (err) => {
      if (err.error.error.reason) {
        this.toast.error(err.error.error.reason);
        this.spinner.hide()
      }
    });
}
//------------site name information-------------

getSiteNameByList(){
  this.sitecreationservice
  .getSiteCreation()
  .pipe(first())
  .subscribe(
    (responce) => {
      console.log("sidename"+responce)
      this.SiteNameList = responce;
      console.log("sidename"+responce);
      this.SiteNameList = responce.data;
      // this.sidenameObj = this.sidenameObj.data;
      // let sideplace = this.sidenameObj.sitePlace;
      // this.sideplaceObj = sideplace;
      // console.log("place "+this.sideplaceObj);
      $(document).ready(function () {});
    },
    (err) => {
      if (err.error.error.reason) {
        this.toast.error(err.error.error.reason);
        this.spinner.hide()
      }
    });
}

getsiteDetail(id:any){
  console.log("hello");
  this.sitecreationservice
. getSiteCreationById(id.id)
.pipe(first())
.subscribe(
  (responce) => {
    console.log(responce);
    this.sidefulllistObj = responce;
    this.sidefulllistObj=this.sidefulllistObj.data
    let sitename=this.sidefulllistObj.sitePlace
this.sideplaceObj=sitename

    console.log("this is my site place"+this.sideplaceObj)
    $(document).ready(function () {});
  },
  (err) => {
    if (err.error.error.reason) {
      this.toast.error(err.error.error.reason);
      this.spinner.hide()
    }
  });
}
//----------material information--------------------

getMasterList() {
  this.masterService
    .getMaster()
    .pipe(first())
    .subscribe(
      (responce) => {
        console.log(responce)
        this.materiallist = responce.data;
        console.log(responce)
        $(document).ready(function () {});
      },
      (err) => {
        if (err.error.error.reason) {
          this.toast.error(err.error.error.reason);
          this.spinner.hide()
        }
      });
}


getMaterial(id: any) {
  console.log(this.masterService);
  this.masterService.getMaterialById(id).subscribe(
    (res) => {
      console.log("response"+res);
    },
    (err) => {
      if (err.error.error.reason) {
        this.toast.error(err.error.error.reason);
        this.spinner.hide()
      }
    });
}

//------------------------------ vendor inforation ---------------

getvendorList(){
  this.vendorservice
  .getVendor()
  .pipe(first())
  .subscribe(
    (responce) => {
      console.log("vendornames"+responce)
      this.vendornameList = responce;
      this.vendornameListArr =  this.vendornameList.data;
      console.log(this.vendornameListArr);
      $(document).ready(function () {});
    },
    (err) => {
      if (err.error.error.reason) {
        this.toast.error(err.error.error.reason);
        this.spinner.hide()
      }
    });
}

//---------------------UOM information---------------------------

getUOMList(){
  this.service
  .getAlluomList()
  .pipe(first())
  .subscribe(
    (responce) => {
      console.log("UOMnames"+responce)
      this.UOMnameslist = responce;
      this.UOMnameslistArr =  this.UOMnameslist.data;
      console.log(this.UOMnameslistArr);
      $(document).ready(function () {});
    },
    (err) => {
      if (err.error.error.reason) {
        this.toast.error(err.error.error.reason);
        this.spinner.hide()
      }
    });
}


 //------------------- create and update information--------------

  getAllVendorPurchaseList(){
    if (this.vendorPurchaseid != null) {
      // this.spinner.show()
      this.service.updateVendorPurchase(this.vendorPurchaseForm.value).subscribe((responce) => {
        if (responce != null) {
          alert('update Successfully');
          this.result = responce;
          this.spinner.hide();
          this.toast.success(this.result.data);
          this.router.navigateByUrl('/dashboard/vendorPurchaseList');
        } else {
          alert('Update Failed');
        }
      },
      (err) => {
        if (err.error.error.reason) {
          this.toast.error(err.error.error.reason);
          this.spinner.hide()
        }
      });
    } else {
      // this.spinner.show();
    
      console.log(this.vendorPurchaseForm.value);
      this.submitted = true;
      this.service.createVendorPurchaseWise(this.vendorPurchaseForm.value).subscribe((responce) => {
        console.log(responce);
        this.result = responce;
        this.toast.success(this.result.data);
        this.router.navigateByUrl('/dashboard/vendorPurchaseList');
        this.spinner.hide();
      },
      (err) => {
        if (err.error.error.reason) {
          this.toast.error(err.error.error.reason);
          this.spinner.hide()
        }
      });
    }
  }

  getVendorPurchaseByCode(id: any){
    this.service.getVendorPurchaseByCode(id).subscribe((response) => {
      console.log("respone"+response)
      this.vendorPurchaseObj = response;
      alert(this.vendorPurchaseObj.data.id);
      this.vendorPurchaseObj = this.vendorPurchaseObj.data;
      console.log(this.vendorPurchaseObj)
      this.matArr=this.vendorPurchaseObj.vendorPurchaseMaterialList
      console.log(this.matArr)
      console.log("mat"+this.matArr)
      console.log("vendor"+this.vendorPurchaseObj.vendorPurchaseMaterialList)
      let array=<FormArray>this.vendorPurchaseForm.controls['vendorPurchaseMaterialList'];
      array.controls=[];
      console.log(this.matArr.length)
      if(this.matArr.length>0){
        for (let val of this.matArr) {
          array.push(this.vendorPurchaseMaterialList())
        }
        this.vendorPurchaseForm.patchValue({vendorPurchaseMaterialList:this.vendorPurchaseObj.vendorPurchaseMaterialList})
      }
    },
    (err) => {
      if (err.error.error.reason) {
        this.toast.error(err.error.error.reason);
        this.spinner.hide()
      }
    });
  }
  onKey(event:any,index:any){
    console.log(event.value)
    let array:any;
    array=event.value;
    console.log(array)
    let grantTotal=0;
    for ( index = 0; index < array.length; index++) {
      grantTotal += array[index].totalAmount ;
      console.log(grantTotal)
    }
    this.vendorPurchaseObj.grantTotal=grantTotal;
    console.log(this.vendorPurchaseObj.grantTotal)
  }
  }

