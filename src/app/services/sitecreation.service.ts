import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SitecreationService {
  private _baseUrl = environment.API_URL;
  private createSiteCreation =  this._baseUrl + '/api/siteCreation/create';
  private getSiteCreationByList = this._baseUrl+'/api/siteCreation/getSiteList';
  private getSiteCreationByCode = this._baseUrl+'/api/siteCreation/getBySiteCreation';
  private updateSiteCreationByCode = this._baseUrl+'/api/siteCreation/update';
  private deleteSiteCreationByCode = this._baseUrl+'/api/siteCreation/update';
  private getSiteEngineerList = this._baseUrl+'/api/siteengineer/getSiteEngineerList';
  private getOwnerList = this._baseUrl+'/api/owner/getownerlist';
private getOwenerListById=this._baseUrl+'/api/owner/getowner'
  constructor(private http:HttpClient, private route:Router) { }

  saveSiteCreation(sitecreationForm:any){
    return this.http.post(this.createSiteCreation, sitecreationForm)
      }
    
    getSiteCreation(){
      return this.http.get<any>(this.getSiteCreationByList)
    }
    getSiteCreationById(id:any){
      return this.http.get(this.getSiteCreationByCode+'/'+id)
    }
    updateSiteCreationById(sitecreationForm:any){
      return this.http.put(this.updateSiteCreationByCode, sitecreationForm);
    }
    deleteSiteCreationById(id:any,status:any){
      return this.http.put(this.deleteSiteCreationByCode+'/'+id+'/'+status, id,status)
    }



    getSiteEngineerFullList(){
      return this.http.get<any>(this.getSiteEngineerList);
    }

    getOwnerFullList(){
      return this.http.get<any>(this.getOwnerList);
    }
    getOwenerById(id:any){
      return this.http.get(this.getOwenerListById+'/'+id)
    }
}
