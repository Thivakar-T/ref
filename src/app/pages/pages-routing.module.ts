import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractComponent } from './contract/contract.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { SiteEngineerComponent } from './site-engineer/site-engineer.component';
import { ContractorworkersComponent } from './contractorworkers/contractorworkers.component';
import { OwnerComponent } from './owner/owner.component';
import {ManagerListComponent} from './manager-list/manager-list.component';
import {CreateManagerComponent} from './create-manager/create-manager.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { SiteCreationComponent } from './sitecreation/sitecreation.component';
import { SiteEngineerlistComponent } from './site-engineerlist/site-engineerlist.component';
import { ContractlistComponent } from './contractlist/contractlist.component';
import { ContractorworkerlistComponent } from'./contractorworkerlist/contractorworkerlist.component';
import { OwnerlistComponent } from "../pages/ownerlist/ownerlist.component";
import { MaterialListComponent } from './material-list/material-list.component';
import { SiteCreationListComponent } from './site-creation-list/site-creation-list.component';
import { VendorWisePurchaseComponent } from './vendor-wise-purchase/vendor-wise-purchase.component';
import { VendorListWisePurchaseComponent } from './vendor-list-wise-purchase/vendor-list-wise-purchase.component';


const routes: Routes = [
  {path:"contract", component:ContractComponent},
  {path:"contract/edit/:id", component:ContractComponent},
  {path:"vendor", component:VendorListComponent},
  {path:"siteEngineer", component:SiteEngineerComponent},
  {path:"siteEngineerlist",component: SiteEngineerlistComponent},
  {path:"contractorWorkers", component:ContractorworkersComponent},
  {path:"vendorList", component:VendorListComponent},
  {path:"sidenav/siteEngineer", component:SiteEngineerComponent},
  {path:"managerList", component:ManagerListComponent},
  {path:"createManager", component:CreateManagerComponent},
  {path:"createManager/edit/:id",component:CreateManagerComponent},
  {path:"vendorDetails", component:VendorDetailsComponent},
  {path:"OwnerComponent", component:OwnerComponent},
  {path:"ownerlist",component:OwnerlistComponent},
  {path:"siteCreation",component:SiteCreationComponent},
  {path:"ContractorworkerlistComponent",component:ContractorworkerlistComponent},
  {path:"contractlist",component:ContractlistComponent},
  {path:"vendorDetails/edit/:id",component:VendorDetailsComponent},
  {path:"MaterialType", component:MaterialListComponent},
  {path:"MaterialType/edit/:id",component:MaterialListComponent},
  {path:"siteEngineer/edit/:id",component:SiteEngineerComponent},
  {path:"SiteCreationList", component:SiteCreationListComponent},
  {path:"siteCreation/edit/:id", component:SiteCreationComponent},
  {path:"vendorWisePurchase", component:VendorWisePurchaseComponent},
  {path:"vendorPurchaseList",component:VendorListWisePurchaseComponent},
  {path:"vendorWisePurchase/edit/:id",component:VendorWisePurchaseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
