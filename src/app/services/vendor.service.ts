import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private _baseUrl = environment.API_URL;
  private createVendorDetail = this._baseUrl+'/api/vendor/create';
  private getVendorDetailsByStatus = this._baseUrl+'/api/vendor/getvendorbystatus';
  private getVendorById = this._baseUrl+'/api/vendor/getvendor';
  private updateVendorById = this._baseUrl+'/api/vendor/update';
  private deleteVendorById = this._baseUrl+'/api/vendor/delete';

  constructor(private http:HttpClient, private route:Router) { }

  createVendor(vendorForm:any){
    return this.http.post(this.createVendorDetail, vendorForm);
  }
  getVendor(){
    return this.http.get(this.getVendorDetailsByStatus);
  }
  getVendorByCode(id:any){
    return this.http.get(this.getVendorById+'/'+id)
  }
  updateVendor(vendorForm:any){
    return this.http.put(this.updateVendorById, vendorForm);
  }
  deleteVendor(id:any){
    return this.http.put(this.deleteVendorById+'/'+id,id);
  }
}
