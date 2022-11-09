import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddrowComponent } from './addrow/addrow.component';

const routes: Routes = [
  {path:"addrow", component:AddrowComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
