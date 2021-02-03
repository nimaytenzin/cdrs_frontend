import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteGuard } from './service/route.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UpdatePlotComponent } from './update-plot/update-plot.component';
import { UpdateRoadComponent } from './update-road/update-road.component';
import { UpdateFootpathComponent } from './update-footpath/update-footpath.component';
import { MapviewComponent } from './mapview/mapview.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UpdateBuildingComponent } from './update-building/update-building.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path:'registerUser', component:RegisterUserComponent},
  {path: 'selectzone', component: SelectZoneComponent},
  {path:'mapview', component:MapviewComponent},
  {path: 'updateplot', component: UpdatePlotComponent},
  {path:'updateroad', component:UpdateRoadComponent},
  {path:"updatepath", component:UpdateFootpathComponent},
  {path:"updatebuilding", component:UpdateBuildingComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'camera',component: UploadImageComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
