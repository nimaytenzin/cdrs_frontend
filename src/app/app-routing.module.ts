import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { DashboardComponent } from './dashboard/dashboard.component';;
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UpdatePlotComponent } from './update-plot/update-plot.component';
import { UpdateRoadComponent } from './update-road/update-road.component';
import { UpdateFootpathComponent } from './update-footpath/update-footpath.component';
import { MapviewComponent } from './mapview/mapview.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UpdateBuildingComponent } from './update-building/update-building.component';
import { CameraComponent } from './camera/camera.component';
import { UpdateFeatureComponent } from './update-feature/update-feature.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
  {path:'registerUser', component:RegisterUserComponent},
  {path: 'selectzone', component: SelectZoneComponent},
  {path:'mapview', component:MapviewComponent},
  {path: 'updateplot', component: UpdatePlotComponent},
  {path: 'updatefeature', component: UpdateFeatureComponent},
  {path:'uploadImage', component:UploadImageComponent},
  {path:'updateroad', component:UpdateRoadComponent},
  {path:'takephoto',component:UploadImageComponent},
  {path:"updatepath", component:UpdateFootpathComponent},
  {path:"updatebuilding", component:UpdateBuildingComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'camera',component: CameraComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
