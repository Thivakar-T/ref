import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import {NgbAlertModule,NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { CreateManagerComponent } from './create-manager/create-manager.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwnerComponent } from './owner/owner.component';
import { ContractorworkersComponent } from './contractorworkers/contractorworkers.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { TokenInterceptorService } from './../services/token-interceptor.service';
import { SiteEngineerComponent } from './site-engineer/site-engineer.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { SiteCreationComponent } from './sitecreation/sitecreation.component';
import { SiteEngineerlistComponent } from './site-engineerlist/site-engineerlist.component';
import { ContractComponent } from './contract/contract.component';
import { ContractlistComponent } from './contractlist/contractlist.component';
import { ContractorworkerlistComponent } from './contractorworkerlist/contractorworkerlist.component';
import { OwnerlistComponent } from './ownerlist/ownerlist.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { SiteCreationListComponent } from './site-creation-list/site-creation-list.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { VendorWisePurchaseComponent } from './vendor-wise-purchase/vendor-wise-purchase.component';
import { VendorListWisePurchaseComponent } from './vendor-list-wise-purchase/vendor-list-wise-purchase.component';

@NgModule({
  declarations: [
    VendorListComponent,
    CreateManagerComponent,
    ManagerListComponent,
    VendorListComponent,
    SiteEngineerComponent,
    OwnerComponent,
    ContractorworkersComponent,
    VendorDetailsComponent,
    SiteCreationComponent,
    SiteEngineerlistComponent,
    ContractComponent,
    ContractlistComponent,
    ContractorworkerlistComponent,
    OwnerlistComponent,
    MaterialListComponent,
    SiteCreationListComponent,
    VendorWisePurchaseComponent,
    VendorListWisePurchaseComponent,

  ],
  imports: [
    CommonModule,
    NgbAlertModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxSpinnerModule
  ],
    providers: [{provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService,multi:true}],

})
export class PagesModule { }
