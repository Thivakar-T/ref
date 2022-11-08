import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CreatemanagerService } from 'src/app/services/createmanager.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/address.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-create-manager',
  templateUrl: './create-manager.component.html',
  styleUrls: ['./create-manager.component.scss'],
})
export class CreateManagerComponent implements OnInit {
  managerForm: FormGroup | any;
  managerObj:any={}
  submitted = false;
  error = '';
  countryArr: any = {};
  countryArray: any = [];
  stateList: any = [];
  stateArr: any = [];
  cityList: any = [];
  cityArr: any = [];
  result: any;
  id: any;
  stateId: any;
  cityId: any;
  managerid: any;
  editdata: any;
  manager: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: CreatemanagerService,
    private route: ActivatedRoute,
    public toast: ToastrService,
    private router: Router,
    private addressService: AddressService,
    private spinner:NgxSpinnerService

  ) {
    this.managerid = this.route.snapshot.paramMap.get('id');
    if (this.managerid != null) {
      this.getManagerById(this.managerid);
    }
  }

  ngOnInit(): void {
    this.managerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.minLength(10)]],
      pinCode: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      cityId: [null, Validators.required],
      stateId: [null, Validators.required],
      countryId: [null, Validators.required],
      bankName: ['', Validators.required],
      bankBranch: ['', Validators.required],
      accountNo: ['', Validators.required],
      ifscCode: ['', Validators.required],
      phoneNo2: ['', [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.minLength(10)]],
      id: [''],
    });

    this.getCountry();
    this.getCity(this.cityId);
    this.getState(this.stateId);
    this.stateArr=this.stateArr
    console.log("state"+this.stateArr)
  }
  get f(): { [key: string]: AbstractControl } {
    return this.managerForm.controls;
  }

  getManager() {
    this.spinner.show()
    if (this.managerid != null) {
      console.log(this.managerForm);
      this.service
        .updateManagerById(this.managerForm.value)
        .subscribe((responce) => {
          if (responce != '') {
            this.result = responce;
            this.spinner.hide()
            this.toast.success(this.result.data);
            this.router.navigateByUrl('/dashboard/managerList');
          }
        },(err)=>{
          this.toast.error(err.error.error.reason);
        });
    } else {
      if(this.managerForm.valid)
      {
      this.spinner.show()
      console.log(this.managerForm.value);
      this.submitted = true;
      this.service.saveManager(this.managerForm.value).subscribe((responce) => {
        console.log(responce);
        this.result = responce;
        this.toast.success(this.result.data);
        this.router.navigateByUrl('/dashboard/managerList');
        this.spinner.hide()
      },(err)=>{
        this.toast.error(err.error.error.reason);
      });
    }
    }
  }

  getManagerById(id: any) {
    this.spinner.show()
    this.service.getManagerById(id).subscribe((response) => {
      this.managerObj = response
      alert(this.managerObj.data.id);
      this.managerObj=this.managerObj.data
      this.spinner.hide()
     console.log()
      console.log(this.managerObj)
      console.log(this.managerObj.countryId)
      this.stateId=this.managerObj.countryId;
      this.getState(this.stateId)
      this.cityId=this.managerObj.stateId;
      this.getCity(this.cityId)
      console.log("state"+this.managerObj.stateId)
      console.log(this.managerObj.cityId)
      console.log("city"+this.cityList)
     
    },(err)=>{
      this.toast.error(err.error.error.reason);
    });
  }

  country() {
    this.addressService.getCountry().subscribe((res) => {
      console.log(res);
    });
  }
  getCountry() {
    console.log(this.addressService);
    this.addressService.getCountry().subscribe(
      (res) => {
        console.log(res);
        this.countryArray = res;
        this.countryArr = this.countryArray.data;
        console.log(this.countryArr);
      },
      (err) => {
        this.toast.error(err.error.error.reason);
      }
    );
  }

  getState(id: any) {
    this.stateId=id
    this.addressService.getState(this.stateId).subscribe(
      (responce) => {
        console.log(responce);
        this.stateArr = responce;
        this.stateList = this.stateArr.data;
      },
      (err) => {
        this.toast.error(err.error.error.reason);
      }
    );
  }
  getCity(id: any) {
    this.cityId=id
    this.addressService.getCity(this.cityId).subscribe(
      (responce) => {
        console.log('city');
        console.log(id);
        console.log(responce);
        this.cityArr = responce;
        this.cityList = this.cityArr.data;
      },
      (err) => {
        this.toast.error(err.error.error.reason);
      }
    );
  }
 
}
