import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private _baseUrl = environment.API_URL;
  private createCity =  this._baseUrl + '/api/Address/getCity';
  private createState =  this._baseUrl + '/api/Address/getState';
  private createCountry =  this._baseUrl + '/api/Address/getAllCountry';
  constructor(private http:HttpClient, private route:Router) {}

  getCity(id:any){
    return this.http.get(this.createCity+'/'+id)
  }

  getState(id:any){
    return this.http.get(this.createState+'/'+id)
  }

  getCountry(){
    return this.http.get(this.createCountry)
  }
}
