import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SiteEngineerService } from 'src/app/services/site-engineer.service';
@Component({
  selector: 'app-site-engineer',
  templateUrl: './site-engineer.component.html',
  styleUrls: ['./site-engineer.component.scss']
})
export class SiteEngineerComponent implements OnInit {
  siteForm!: FormGroup;
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
  siteid: any;
  editdata: any;
  siteId: any;
  siteengineer: any = [];
  siteengineerObj: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: SiteEngineerService,
    private route: ActivatedRoute,
  ) {
    this.siteId = this.route.snapshot.paramMap.get('id');
    if (this.siteId != null) {
      this.getSiteengineerById(this.siteId);
    }
  }

  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('id');
    console.log(this.idParam)
    this.siteForm = this.formBuilder.group({
      'name': new FormControl(null, Validators.required),
      'addressLine1': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'phoneNo': new FormControl(null, Validators.required),
      'phoneNo2': new FormControl(null, Validators.required),
      'addressLine2': new FormControl(null, Validators.required),
      'countryId': new FormControl(null, Validators.required),
      'stateId': new FormControl(null, Validators.required),
      'cityId': new FormControl(null, Validators.required),
      'pinCode': new FormControl(null, Validators.required),
      'bankName': new FormControl(null, Validators.required),
      'bankBranch': new FormControl(null, Validators.required),
      'ifscCode': new FormControl(null, Validators.required),
      'accountNo': new FormControl(null, Validators.required),
      'id': new FormControl(null),

    })
    this.getCountry();
    console.log(this.stateId)
    this.getState(this.stateId);
    this.getCity(this.cityId);
  }


  get f(): { [key: string]: AbstractControl } { return this.siteForm.controls; }

  onSubmit() {
    console.log(this.siteForm.value);
    this.submitted = true;

    if (this.siteId) {
      this.siteForm.value.id=this.siteId
      this.service.updateSiteengineer(this.siteForm.value).subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/dashboard/siteEngineerlist');
      },
        err => {
          console.log(err);
        });
    } else {
      this.service.saveSiteengineer(this.siteForm.value).subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/dashboard/siteEngineerlist');
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
  getState(stateId: any) {
    this.stateId=stateId;
    console.log(this.stateId);
    this.service.getState(this.stateId).subscribe((res) => {
      console.log(res);
      this.stateList = res;
      this.stateArr = this.stateList.data;
      console.log(this.stateArr)

    })
  }
  getCity(cityId:any) {
    this.cityId=cityId
    console.log(this.cityId);
    this.service.getCity(this.cityId).subscribe((res) => {
      console.log(res);
      this.cityList = res;
      this.cityArr = this.cityList.data;
    })
  }


  getSiteengineerById(id: any) {
    this.service.getSiteengineerById(id).subscribe((response) => {
      this.editdata = response;
      alert(this.editdata.data.id);
      this.siteengineerObj = this.editdata.data;
      this.stateId=this.siteengineerObj.countryId
      this.getState(this.stateId)
      this.cityId=this.siteengineerObj.stateId
      this.getCity(this.cityId)
      console.log(this.siteengineerObj)

    })
  }
}
