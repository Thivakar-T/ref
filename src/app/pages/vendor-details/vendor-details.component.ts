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
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/address.service';
import { VendorService } from 'src/app/services/vendor.service';
import { first } from 'rxjs/operators';
import { MasterService } from 'src/app/services/master.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss'],
})
export class VendorDetailsComponent implements OnInit {
  vendorForm: FormGroup | any;
  submitted = false;
  error = '';
  index: any;
  cars = [];
  vendors = [];
  matArr: any = [];

  countryArr: any = {};
  countryArray: any = [];

  stateList: any = [];
  stateArr: any = [];

  cityList: any = [];
  cityArr: any = [];

  materialArr: any = [];
  materialObj: any = {};

  id: any;
  vendorid: any;
  editdata: any;
  vendor: any = [];
  result: any;
  vendorObj: any = {};
  materialList: any = {};
  vendorStateId: any;
  vendorCityId: any;
  StateId: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public toast: ToastrService,
    private router: Router,
    private service: VendorService,
    private addressService: AddressService,
    private masterService: MasterService,
    private spinner: NgxSpinnerService
  ) {
    this.vendorid = this.route.snapshot.paramMap.get('id');
    if (this.vendorid != null) {
      this.getVendorById(this.vendorid);
    }
  }

  ngOnInit(): void {
    this.vendorForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      vendorName: ['', Validators.required],
      vendorEmail: ['', [Validators.required, Validators.email]],
      vendorPhoneno: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          Validators.minLength(10),
        ],
      ],
      vendorAddress1: ['', Validators.required],
      vendorAddress2: ['', Validators.required],
      vendorCityId: [null, Validators.required],
      vendorStateId: [null, Validators.required],
      vendorCountryId: [null, Validators.required],
      pinCode: ['', Validators.required],
      description: ['', Validators.required],
      gstIn: ['', Validators.required],
      id: [''],
      materialList: this.formBuilder.array([this.createMaterialFormGroup()]),
    });

    this.getCountry();
    this.getCity(this.vendorCityId);
    this.getState(this.vendorStateId);
    this.stateArr = this.stateArr;
    console.log('state' + this.stateArr);
    this.getMasterList();
  }
  getMasterList() {
    this.masterService
      .getMaster()
      .pipe(first())
      .subscribe(
        (responce) => {
          console.log(responce);
          this.vendors = responce.data;
          console.log(responce);
          $(document).ready(function () {});
        },
        (err) => {
          if (err.error.error.reason) {
            this.toast.error(err.error.error.reason);
            this.spinner.hide();
          }
        }
      );
  }

  createMaterialFormGroup() {
    return this.formBuilder.group({
      materialId: [null, [Validators.required]],
      description: [null, [Validators.required]],
      id: [''],
      // status: [''],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.vendorForm.controls;
  }
  get materialListAr(): FormArray {
    return (<FormArray>this.vendorForm.get('materialList')) as FormArray;
  }

  getVendor() {
    if (this.vendorid != null) {
      // this.spinner.show()
      console.log(this.vendorForm.value);
      console.log(this.vendorForm.value.materialList);
      console.log(this.vendorForm.value.materialList[0]);
      console.log(this.materialListAr.value)
      this.vendorForm.value.materialList=this.materialListAr.value;
      this.service.updateVendor(this.vendorForm.value).subscribe(
        (responce) => {
        console.log(responce)
            alert('update Successfully');
            this.result = responce;
            this.spinner.hide();
            this.toast.success(this.result.data);
            this.router.navigateByUrl('/dashboard/vendorList');
      
        },
        (err) => {
          if (err.error.error.reason) {
            this.toast.error(err.error.error.reason);
            this.spinner.hide();
          }
        }
      );
    } else {
      // this.spinner.show();
      console.log(this.vendorForm.value);
      this.submitted = true;
      this.service.createVendor(this.vendorForm.value).subscribe(
        (responce) => {
          console.log(responce);
          this.result = responce;
          this.toast.success(this.result.data);
          this.router.navigateByUrl('/dashboard/vendorList');
          this.spinner.hide();
        },
        (err) => {
          if (err.error.error.reason) {
            this.toast.error(err.error.error.reason);
            this.spinner.hide();
          }
        }
      );
    }
  }
  getVendorById(id: any) {
    this.service.getVendorByCode(id).subscribe(
      (response) => {
        console.log('respone' + response);
        this.vendorObj = response;
        alert(this.vendorObj.data.id);
        this.vendorObj = this.vendorObj.data;
        console.log(this.vendorObj);

        console.log(this.vendorObj.vendorCountryId);
        this.vendorStateId = this.vendorObj.vendorCountryId;
        console.log('This is the state ' + this.vendorStateId);
        this.getState(this.vendorStateId);
        this.vendorCityId = this.vendorObj.vendorStateId;
        this.getCity(this.vendorCityId);
        console.log('state' + this.vendorObj.vendorStateId);
        console.log(this.vendorObj.vendorCityId);

        console.log('city' + this.cityList);
        this.matArr = this.vendorObj.materialList;
        console.log(this.matArr);
        console.log('mat' + this.matArr);
        console.log('vendor' + this.vendorObj.materialList);
        let array = <FormArray>this.vendorForm.controls['materialList'];
        array.controls = [];
        console.log(this.matArr.length);
        if (this.matArr.length > 0) {
          for (let val of this.matArr) {
            array.push(this.createMaterialFormGroup());
          }
          this.vendorForm.patchValue({
            materialList: this.vendorObj.materialList,
          });
        }
        // this.vendorObj.materialList = this.vendorObj.data.materialList.id;
        // this.toast.success(this.vendorObj.data.materialList.id, 'Success!');
      },
      (err) => {
        if (err.error.error.reason) {
          this.toast.error(err.error.error.reason);
          this.spinner.hide();
        }
      }
    );
  }

  addItem() {
    console.log(this.materialListAr);
    let order = this.createMaterialFormGroup();
    console.log('oder' + order);
    this.materialListAr.push(order);
    console.log(order);
    // let currentElement = this.materialListAr[index];
    // this.materialListAr.splice(index, 0, currentElement);
  }
  delete(index: any) {
    // (this.materialListAr.splice(this.index, 1);
    console.log(index)
    this.vendorForm.value.materialList[index].status="DELETED";
    console.log(this.vendorForm.value.materialList[index].status)
    console.log(this.materialListAr)
    this.materialListAr.removeAt(index);

    // { this.materialListAr.controls.["controls"].splice(index,1) }
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
    this.vendorStateId = id;
    console.log(id);
    this.addressService.getState(this.vendorStateId).subscribe(
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
    this.addressService.getCity(id).subscribe(
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

  getMaterial(id: any) {
    console.log(this.masterService);
    this.masterService.getMaterialById(id).subscribe(
      (res) => {
        console.log('response' + res);
      },
      (err) => {
        if (err.error.error.reason) {
          this.toast.error(err.error.error.reason);
          this.spinner.hide();
        }
      }
    );
  }
}
