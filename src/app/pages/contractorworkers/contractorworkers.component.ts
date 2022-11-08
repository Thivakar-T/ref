import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { AbstractControl,FormControl, FormGroup ,FormBuilder,Validator, Validators} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {ContractWorkersService} from './../../services/contract-workers.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-Contractorworkers',
  templateUrl: './Contractorworkers.component.html',
  styleUrls: ['./Contractorworkers.component.scss']
})
export class ContractorworkersComponent implements OnInit {
  ContractorWorkerForm!:FormGroup |any;
  submitted=false;
  error="";
id:any;
  countryList:any;
  countryArr!:[];
  stateList:any;
  stateArr!:[];
  cityList:any;
  cityArr!:[];
  result:any={}
  workerid:any
  editdata:any;
  worker:any=[];

  constructor(
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toast:ToastrService,
     private  service:ContractWorkersService
  ) {
    }

  ngOnInit(): void {
    this.ContractorWorkerForm=this.formBuilder.group({
      'name':new FormControl(null,Validators.required),
      'addressLine1':new FormControl(null,Validators.required),
      'stateId':new FormControl(null,Validators.required),
      'phoneNumber':new FormControl(null,Validators.required),
      'addressLine2':new FormControl(null,Validators.required),
      'countryId':new FormControl(null,Validators.required),
      'id':new FormControl(null),
      'cityId':new FormControl(null,Validators.required),
      'contracterName':new FormControl(null,Validators.required),
    })
  
  

    this.getCountry();
   this.getState(this.id);
   this.getCity(this.id);
  }
  get f(): { [key: string]: AbstractControl }{return this.ContractorWorkerForm.controls;}
  onSubmit() {
    console.log(this.ContractorWorkerForm.value);
    this.submitted = true;
    this.service.saveWorker(this.ContractorWorkerForm.value).subscribe((response) => {
      console.log(response);
    },
    err=>{
      console.log(err);
    });
}
getworker(id:any) {

  if (this.workerid!= null){
    console.log(this.ContractorWorkerForm);
    this.service
      .updateWorker(id,this.ContractorWorkerForm) .subscribe((responce) => {
        if (responce != "") {
          alert('update Successfully');
         this. result=responce
        
          this.toast.success(this.result.data);
      this.router.navigateByUrl("/dashboard/workerList");
        }
      
      });
    } else{

      console.log(this.ContractorWorkerForm.value);
      this.submitted = true;
      this.service.saveWorker(this.ContractorWorkerForm.value).subscribe((responce) => {
        console.log(responce);
        this. result=responce
        this.toast.success(this.result.data);
        this.router.navigateByUrl("/dashboard/workerList");
     
      });
    }
}
getworkerById(id: any) {
  this.service.updateWorker(id,this.ContractorWorkerForm).subscribe((response) => {
    this.editdata = response;
    alert(this.editdata.data.id);
    this.ContractorWorkerForm=  this.formBuilder.group({
   id : this.editdata.data.id,
   name: this.editdata.data.name,
   phoneNumber: this.editdata.data.phoneNo,
   pinCode: this.editdata.data.pinCode,
   addressLine1: this.editdata.data.addressLine1,
   addressLine2: this.editdata.data.addressLine2,
   cityId: this.editdata.data.cityId,
   stateId: this.editdata.data.stateId,
   countryId: this.editdata.data.countryId,
  });
})
}
getCountry(){
  this.service.getCountry().subscribe((res)=>{
    console.log(res)
    this.countryList=res;
    this.countryArr=this.countryList.data;
    console.log(this.countryArr)
  },
  err => {
    this.toast.error(err.error.error.reason);
  });
}
getState(id:any){
  console.log(id)
  this.service.getState(id).subscribe((res)=>{
    console.log(res)
    this.stateList=res;
    this.stateArr=this.stateList.data;
    console.log(this.stateArr)
  },
  err => {
    this.toast.error(err.error.error.reason);
  });
}
getCity(id:any) {   
  this.service.getCity(id).subscribe((res) => {
    console.log('city');
    console.log(id);
    console.log(res);
    this.cityList =res;
    this.cityArr = this.cityList.data;
  },
  err => {
    this.toast.error(err.error.error.reason);
  });
}
}
