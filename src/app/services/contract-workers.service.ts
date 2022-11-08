import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ContractWorkersService {
  private _baseUrl =environment.API_URL;
  private createWorker =this._baseUrl + '/api/workers/create';
  private _getcontractorworker =this._baseUrl+'/api/workers/getemployeeList';
  private country=this._baseUrl + '/api/Address/getAllCountry';
  private city=this._baseUrl +'/api/Address/getCity';
  private state=this._baseUrl +'/api/Address/getState';
  private worker=this._baseUrl+'/api/workers/update';
  private workers=this._baseUrl+'/api/workers/delete';

 constructor(private http:HttpClient) { }

   saveWorker(worker:any){
    return this.http.post(this.createWorker,worker)
   }
   getcontractorworker(){
    return this.http.get(this._getcontractorworker)
   }
   getworker(){
    return this.http.get(this.createWorker)
   }
   getCountry(){
    return this.http.get(this.country)
   }
   getCity(id:any){
    return this.http.get(this.city+'/'+id)
   }
   getState(id:any){
    return this.http.get(this.state+'/'+id)
   }
  
  updateWorker(id:any,data:any){
    return this.http.put(this.worker+'/'+id,data)
  }
  deleteWorker(id:any,data:any){
    return this.http.delete(this.workers+'/'+id,data)
  }
  }
  

