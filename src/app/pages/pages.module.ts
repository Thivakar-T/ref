import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import {NgbAlertModule,NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { NgSelectModule } from '@ng-select/ng-select';
import { TokenInterceptorService } from './../services/token-interceptor.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { AddrowComponent } from './addrow/addrow.component';

@NgModule({
  declarations: [

  
    AddrowComponent
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
