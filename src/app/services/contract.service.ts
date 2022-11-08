import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { ContractComponent } from '../pages/contract/contract.component';


@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private _baseUrl = environment.API_URL;
  private _contractor = this._baseUrl + '/api/contractor/create';
  private _getContractor = this._baseUrl + '/api/contractor/getcontractorbystatus';
  private createData =  this._baseUrl + '/api/Data/create';
  private country=this._baseUrl  + '/api/Address/getAllCountry';
  private state=this._baseUrl  + '/api/Address/getState';
  private city=this._baseUrl  + '/api/Address/getCity';
  private deleteContractor=this._baseUrl + '/api/contractor/delete';
  private getContractor=this._baseUrl + '/api/contractor/getContractor';
  private updatecontractor=this._baseUrl +'/api/contractor/update'


  constructor(private http:HttpClient, private route:Router) { }
  savecontractor(data:any){
    return this.http.post(this._contractor,data)
  }
  getContractorid(){
    return this.http.get(this._getContractor)
  }
  getCountry(){
    return this.http.get(this.country)
  }
  getState(id:any){
    return this.http.get(this.state + '/' + id )
  }
  getCity(id:any){
    return this.http.get(this.city + '/' + id )
  }
  deletecontract(id:any){
    return this.http.put(this.deleteContractor + '/' + id,id)
  }
  getContractorById(id:any){
    return this.http.get(this.getContractor + '/' + id)
  }
  updateContractor(data:any){
    return this.http.put(this.updatecontractor,data)
  }
}
