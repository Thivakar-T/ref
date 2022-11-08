import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SiteEngineerService {
  private _baseUrl = environment.API_URL;
  private _siteengineer = this._baseUrl + '/api/siteengineer/create';
  private _getSiteengineer = this._baseUrl + '/api/siteengineer/getSiteEngineerList';
  private createData =  this._baseUrl + '/api/Data/create';
  private country=this._baseUrl  + '/api/Address/getAllCountry';
  private state=this._baseUrl  + '/api/Address/getState';
  private city=this._baseUrl  + '/api/Address/getCity';
  private deletesiteengineer=this._baseUrl + '/api/siteengineer/deletesiteengineer';
  private getsiteenginner=this._baseUrl + '/api/siteengineer/getSiteEngineer';
  private updatesiteenginner=this._baseUrl + '/api/siteengineer/update'

  constructor(private http:HttpClient, private route:Router) { }
  
    saveSiteengineer(siteengineer:any){
      return this.http.post(this._siteengineer,siteengineer)
    }
    getSiteengineer(){
      return this.http.get(this._getSiteengineer)
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
    delete(id:any){
      return this.http.put(this.deletesiteengineer + '/' + id,id)
    }
    getSiteengineerById(id:any){
      return this.http.get(this.getsiteenginner + '/' + id)
    }
    // update(id:any){
    //   return this.http.put(this.update +'/' +id)
    // }
    updateSiteengineer(data:any){
      return this.http.put(this.updatesiteenginner,data)
    }
}


