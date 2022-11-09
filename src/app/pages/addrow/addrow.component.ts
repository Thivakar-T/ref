import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: 'app-addrow',
  templateUrl: './addrow.component.html',
  styleUrls: ['./addrow.component.scss']
})
export class AddrowComponent implements OnInit {
  form: FormGroup;
  addObj:any={}
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: [],
      address: fb.array([
      ])
    })
  }
  ngOnInit(): void {
  }

  vendorPurchaseMaterialList() {
    return this.fb.group({
      street: [''],
      city: ['']
    });
  }
  get vendorWiseList(): FormArray {
    return (<FormArray>this.form.get('address')) as FormArray;
  }
  addItem() {
    let order = this.vendorPurchaseMaterialList();
    this.vendorWiseList.push(order);
    console.log(this.vendorWiseList.controls)

  }
  delete(index:any) {
    this.vendorWiseList.removeAt(index);
  }
  submit(){
    console.log(this.form.value)
    localStorage.setItem("value",JSON.stringify(this.form.value))
  }
  edit(){
    const editdata=JSON.parse(localStorage.getItem('value') || '{}');
    console.log(editdata)
    this.addObj=editdata;
    let docArrList = <FormArray>this.form.controls['address'];
      docArrList.controls = [];
      if(this.addObj.address.length > 0){
        for (let val of this.addObj.address) {
          docArrList.push(this.vendorPurchaseMaterialList());
        }
      }
    this.form.patchValue({ address: this.addObj.address });
  }
}