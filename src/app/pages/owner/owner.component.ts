import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { AbstractControl,FormControl, FormGroup ,FormBuilder,Validator, Validators} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  ownerForm!:FormGroup;
  submitted=false;
  error="";
  countryArr!:[
    name:"NonElementParentNode"
  ];
  stateArr!:[
    name:"NonElementParentNode"
  ];
  cityArr!:[
    name:"NonElementParentNode"
  ];


  constructor(
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    
  ) { }

  ngOnInit(): void {
    this.ownerForm=this.formBuilder.group({
      'ownerName':new FormControl(null,Validators.required),
      'addressline1':new FormControl(null,Validators.required),
      'countryId':new FormControl(null,Validators.required),
      'phoneNo':new FormControl(null,Validators.required),
      'addressline2':new FormControl(null,Validators.required),
      'stateId':new FormControl(null,Validators.required),
      'email':new FormControl(null,Validators.required),
      'City':new FormControl(null,Validators.required),
      'pincode':new FormControl(null,Validators.required),

  })
}

  

  get f(): { [key: string]: AbstractControl }{return this.ownerForm.controls;}
  onSubmit(){
    this.submitted=true;
    if(this.ownerForm.invalid){
      return;
    }
  }
  
}
