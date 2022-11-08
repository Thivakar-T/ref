import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VendorpurchasewiseService {
  private _baseUrl = environment.API_URL;
  private createVendorPurchase = this._baseUrl+'/api/vendorpurchase/create';
  private getVendorPurchaseByList = this._baseUrl+'/api/vendorpurchase/get';
  private getVendorPurchaseById = this._baseUrl+'/api/vendorpurchase/get';
  private updateVendorPurchaseById = this._baseUrl+'/api/vendorpurchase/update';
  private deleteVendorPurchaseById = this._baseUrl+'/api/vendorpurchase/delete';

  private getUOMbyList = this._baseUrl+"/api/UOM/getUOMList";


  constructor(private http:HttpClient, private route:Router) { }

  createVendorPurchaseWise(vendorPurchaseForm:any){
    return this.http.post(this.createVendorPurchase, vendorPurchaseForm);
  }
  getAllVendorPurchaseList(){
    return this.http.get(this.getVendorPurchaseByList);
  }
  getVendorPurchaseByCode(id:any){
    return this.http.get(this.getVendorPurchaseById+'/'+id)
  }
  updateVendorPurchase(vendorPurchaseForm:any){
    return this.http.put(this.updateVendorPurchaseById, vendorPurchaseForm);
  }
  deleteVendorPurchase(id:any){
    return this.http.put(this.deleteVendorPurchaseById+'/'+id,id);
  }


  getAlluomList(){
    return this.http.get(this.getUOMbyList);
  }
}
