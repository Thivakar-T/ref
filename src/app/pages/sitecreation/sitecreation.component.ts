import { assertPlatform, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';
import { SitecreationService } from 'src/app/services/sitecreation.service';
import { CreatemanagerService } from 'src/app/services/createmanager.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;

@Component({
  selector: 'app-sitecreation',
  templateUrl: './sitecreation.component.html',
  styleUrls: ['./sitecreation.component.scss'],
})
export class SiteCreationComponent implements OnInit {
  sitecreationForm: FormGroup | any;
  submitted = false;
  error = '';
  ProjectManagerList:any=[];
  SiteEngineerList:any=[];
  cars: any = [];
  result: any;
  OwnerNameList:any=[];
  OwnerObj:any={};
  address:any;
  city:any
  siteid: any;
  siteObj:any={}
  projectid:any;

addressObj:any
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: SitecreationService,
    private CreatemanagerService: CreatemanagerService,
    public toast: ToastrService,
    private spinner:NgxSpinnerService
  ) {
    this.siteid = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.siteid != null) {
      this.getSiteCreationById(this.siteid);
      
    }
  }

  ngOnInit(): void {
    this.sitecreationForm = this.formBuilder.group({
      id:'',
      siteName: ['', Validators.required],
      sitePlace: ['', Validators.required],
      ownerId: [null, Validators.required],
      ownerPhoneNumber: ["",Validators.required, [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.minLength(10)]],
      ownerAddress: ['', Validators.required],
      ownerEmail: ['', Validators.required],
      projectManagerId: [null, Validators.required],
      siteEngineerId: [null, Validators.required],
      description:[null, Validators.required],
    });
    this.getProjectManagerList();
    this.getSiteEnginnerByList();
    this.getOwnerByList();
    this.getOwnerDetail(this.OwnerNameList.id);

  }

  get f(): { [key: string]: AbstractControl } {
    return this.sitecreationForm.controls;
  }
  getOwnerDetail(id:any){
    this.service
  . getOwenerById(id.id)
  .pipe(first())
  .subscribe(
    (responce) => {
      console.log(responce)
      this.OwnerObj = responce;
      this.OwnerObj=this.OwnerObj.data
      let address=this.OwnerObj.addressLine1 +","+ this.OwnerObj.addressLine2 
      // let city=this.OwnerObj.cityId
this.addressObj=address

      console.log(this.addressObj)
      $(document).ready(function () {});
    },
    (err) => {
      if (err.error.error.reason) {
        this.toast.error(err.error.error.reason);
        this.spinner.hide()
      }
    });
  }

  getProjectManagerList(){
    this.CreatemanagerService
    .getManager()
    .pipe(first())
    .subscribe(
      (responce) => {
        console.log(responce)
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

getSiteEnginnerByList(){
  this.service
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



getOwnerByList(){
  this.service
  .getOwnerFullList()
  .pipe(first())
  .subscribe(
    (responce) => {
      console.log(responce)
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



  getSiteCreation() {
    this.spinner.show()
    if (this.siteid) {
      this.sitecreationForm.value.id=this.siteid
      console.log("update"+this.sitecreationForm);
      this.service
        .updateSiteCreationById(this.sitecreationForm.value)
        .subscribe((responce) => {
          if (responce != '') {
            this.result = responce;
            this.spinner.hide()
            this.toast.success(this.result.data);
            this.router.navigateByUrl('/dashboard/SiteCreationList');
          }
        },
        (err) => {
          if (err.error.error.reason) {
            this.toast.error(err.error.error.reason);
            this.spinner.hide()
          }
        });
      }else{
  
        this.spinner.show()
    console.log(this.sitecreationForm.value);
    this.submitted = true;
    this.service
      .saveSiteCreation(this.sitecreationForm.value)
      .subscribe((responce) => {
        console.log(responce);
        this.result = responce;
        this.toast.success(this.result.data);
        this.router.navigateByUrl('/dashboard/SiteCreationList');
        this.spinner.hide()
      },
      (err) => {
        if (err.error.error.reason) {
          this.toast.error(err.error.error.reason);
          this.spinner.hide()
        }
      });
  }
}

getSiteCreationById(id: any) {
  this.service.getSiteCreationById(id).subscribe((response) => {
  
    this.siteObj = response
    console.log("edit"+  this.siteObj )
    alert(this.siteObj.data.id);
    this.siteObj=this.siteObj.data
   console.log("edit"+this.siteObj)
   this.projectid=this.siteObj.siteEngineerId
   console.log("id"+this.siteObj.siteEngineerId)
  },
  (err) => {
    if (err.error.error.reason) {
      this.toast.error(err.error.error.reason);
      this.spinner.hide()
    }
  });
}

}
