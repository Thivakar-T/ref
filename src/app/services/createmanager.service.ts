import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreatemanagerService {
  private _baseUrl = environment.API_URL;
  private createManager =  this._baseUrl + '/api/projectmanager/create';
  private getManagerByList = this._baseUrl+'/api/projectmanager/getProjectManagerList';
  private getManagerByCode = this._baseUrl+'/api/projectmanager/getProjectManager';
  private updateManagerByCode = this._baseUrl+'/api/projectmanager/updateprojectmanager';
  private deleteManagerByCode = this._baseUrl+'/api/projectmanager/deleteProjectManager';

  

  constructor(private http:HttpClient, private route:Router) { 
    
  }


  saveManager(managerForm:any){
    return this.http.post(this.createManager, managerForm)
      }
    
    getManager(){
      return this.http.get<any>(this.getManagerByList)
    }
    getManagerById(id:any){
      return this.http.get(this.getManagerByCode+'/'+id)
    }
    updateManagerById(managerForm:any){
      return this.http.put(this.updateManagerByCode, managerForm);
    }
    deleteManagerById(id:any){
      return this.http.put(this.deleteManagerByCode+'/'+id, id)
    }
}
