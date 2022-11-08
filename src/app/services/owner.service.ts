import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router  } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private _baseUrl =environment.API_URL;
  private createOwner =this._baseUrl+'/api/owner/create';
  private _getowner=this._baseUrl+'/api/owner/getownerlist';
  private country=this._baseUrl + '/api/Address/getAllCountry';
  private city=this._baseUrl + '/api/Address/getCity';
  private state=this._baseUrl + '/api/Address/getState'; 
  private owner=this._baseUrl+'//api/owner/updateowner';
  private owners=this._baseUrl+'//api/owner/delete/ownerId';

  constructor(private http:HttpClient) { }

  saveOwner(owner:any){
    return this.http.post(this.createOwner,owner)
  }
  getowner(){
    return this.http.get(this._getowner)

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
   updateOwner(id:any,data:any){
    return this.http.put(this.owner+'/'+id,data)
   }
   deleteOwner(id:any,data:any){
    return this.http.delete(this.owners+'/'+id,data)
   }

  }

