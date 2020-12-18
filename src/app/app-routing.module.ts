import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteGuard } from './service/route.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MapComponent } from './map/map.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UpdatePlotComponent } from './update-plot/update-plot.component';
import { UpdateRoadComponent } from './update-road/update-road.component';
import { UpdateFootpathComponent } from './update-footpath/update-footpath.component';
import { MapviewComponent } from './mapview/mapview.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'selectzone', component: SelectZoneComponent},
  {path:'mapview', component:MapviewComponent},
  {path: 'updateplot', component: UpdatePlotComponent},
  {path:'updateroad', component:UpdateRoadComponent},
  {path:"updatepath", component:UpdateFootpathComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'building', component: RegisterComponent },
  {path: 'map', component: MapComponent },
  {path: 'camera',component: UploadImageComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
