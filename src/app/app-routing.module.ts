import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './account/guard.guard';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HeaderComponent } from './layout/header/header.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"", component:LoginComponent,},
  {path:"register", component:RegisterComponent,},
  {path:"dummy", component:ForbiddenComponent,},
  { path:"dashboard", component:HeaderComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),canActivate:[GuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
