import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private _baseUrl = environment.API_URL;
  private createMaster =  this._baseUrl + '/api/materials/create';
  private getMasterByList = this._baseUrl+'/api/materials/getAll';
  private getMasterByCode = this._baseUrl+'/api/materials/get';
  private updateMasterByCode = this._baseUrl+'/api/materials/update';
  private deleteMasterByCode = this._baseUrl+'/api/materials/delete';
  private getMaterialByCode = this._baseUrl+'/api/materials/get';

  constructor(private http:HttpClient, private route:Router) { }

  saveMaster(masterForm:any){
    return this.http.post(this.createMaster, masterForm)
      }
    
    getMaster(){
      return this.http.get<any>(this.getMasterByList)
    }
    getMasterById(id:any){
      return this.http.get(this.getMasterByCode+'/'+id)
    }
    updateMasterById(masterForm:any){
      return this.http.put(this.updateMasterByCode, masterForm);
    }
    deleteMasterById(id:any){
      return this.http.put(this.deleteMasterByCode+'/'+id, id)
    }
getMaterialById(id:any){
  return this.http.get(this.getMaterialByCode+'/'+id)
}
}
