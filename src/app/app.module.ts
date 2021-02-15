import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatGridListModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSnackBarModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CameraComponent } from './camera/camera.component';
import {WebcamModule} from 'ngx-webcam';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UpdatePlotComponent } from './update-plot/update-plot.component';
import { UpdateRoadComponent } from './update-road/update-road.component';
import { UpdateFootpathComponent } from './update-footpath/update-footpath.component';
import { RegisterUserComponent } from "./register-user/register-user.component";
import { MapviewComponent } from './mapview/mapview.component';
import { UpdateBuildingComponent } from './update-building/update-building.component';
import { UpdateFeatureComponent } from './update-feature/update-feature.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    SelectZoneComponent,
    DashboardComponent,
    ChangePasswordComponent,
    ConfirmDialogComponent,
    CameraComponent,
    UploadImageComponent,
    UpdatePlotComponent,
    UpdateRoadComponent,
    UpdateFootpathComponent,
    MapviewComponent,
    RegisterUserComponent,
    UpdateBuildingComponent,
    UpdateFeatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatListModule,
    MatCheckboxModule,
    WebcamModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ ConfirmDialogComponent]
})
export class AppModule { }
