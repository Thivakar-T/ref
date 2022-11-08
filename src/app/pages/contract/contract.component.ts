import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  contractForm!: FormGroup;
  submitted = false;
  error = "";
  countryList: any;
  countryArr: any = [];
  stateArr: any = [];
  stateList: any;
  cityArr: any = [];
  cityList: any;
  result: any;
  id: any;
  stateId: any;
  cityId: any;
  idParam: any;
  contractid: any;
  editdata: any;
  contractor: any = [];
  contractObject: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ContractService,
    private route: ActivatedRoute,) {
    this.contractid = this.route.snapshot.paramMap.get('id');
    if (this.contractid != null) {
      this.getContractorById(this.contractid);
    }
  }

  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('id');
    console.log(this.idParam)
    this.contractForm = this.formBuilder.group({
      'name': new FormControl(null, Validators.required),
      'addressLine1': new FormControl(null, Validators.required),
      'pinCode': new FormControl(null, Validators.required),
      'phoneNo1': new FormControl(null, Validators.required),
      'phoneNo2': new FormControl(null, Validators.required),
      'addressLine2': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'cityId': new FormControl(null, Validators.required),
      'stateId': new FormControl(null, Validators.required),
      'countryId': new FormControl(null, Validators.required),
      'id': new FormControl(null),
    })
    this.getCountry();
    console.log(this.stateId)
    this.getState(this.stateId);
    this.getCity(this.cityId);

  }

  get f(): { [key: string]: AbstractControl } { return this.contractForm.controls; }

  onSubmit() {
    console.log(this.contractForm.value);
    this.submitted = true;

    if (this.contractid) {
      this.contractForm.value.id=this.contractid
      this.service.updateContractor(this.contractForm.value).subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/dashboard/contractlist');
      },
        err => {
          console.log(err);
        });
    } else {
      this.service.savecontractor(this.contractForm.value).subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/dashboard/contractlist');
      },
        err => {
          console.log(err);
        });
    }

  }

  getCountry() {
    this.service.getCountry().subscribe((res) => {
      console.log(res)
      this.countryList = res;
      this.countryArr = this.countryList.data;
      console.log(this.countryArr)
    })
  }
  getState(id: any) {
    console.log(id)
    this.service.getState(id).subscribe((res) => {
      console.log(res);
      this.stateList = res;
      this.stateArr = this.stateList.data;
      console.log(this.stateArr)

    })
  }
  getCity(id: any) {
    console.log(id);
    this.service.getCity(id).subscribe((res) => {
      console.log(res);
      this.cityList = res;
      this.cityArr = this.cityList.data;
    })
  }

  getContractorById(id: any) {
    this.service.getContractorById(id).subscribe((response) => {
      this.editdata = response;
      alert(this.editdata.data.id);
      this.contractObject = this.editdata.data;
      this.stateId=this.contractObject.countryId
      this.getState(this.stateId)
      this.cityId=this.contractObject.stateId
      this.getCity(this.cityId)
      console.log(this.contractObject)

    })
  }
}
