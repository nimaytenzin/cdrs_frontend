import { Component, OnInit } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  buildingId: number;

  constructor(
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.buildingId = Number(sessionStorage.getItem('buildingId'));
  }

  public webcamImage: WebcamImage = null;

  clearImg(){
    this.webcamImage = null;
  }
  
  end(){
      sessionStorage.removeItem('fid')
      sessionStorage.removeItem('ftype')
      sessionStorage.removeItem('building_id')
      sessionStorage.removeItem('setback')
      sessionStorage.removeItem('height')
      sessionStorage.removeItem('area')
      sessionStorage.removeItem('coverage')
      sessionStorage.removeItem('precinct')
      this.router.navigate(['mapview']);
      this.snackBar.open('Feature Details Completed', '', {
        duration: 5000,
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
  }

  uploadImg(){
    if(this.webcamImage){
      let jsonObject = {
        "fid":sessionStorage.getItem('fid'),
        "ftype":sessionStorage.getItem('ftype'),
        "uri":this.webcamImage.imageAsDataUrl
      }
      this.dataService.uploadImg(jsonObject).subscribe(response=>{
        this.webcamImage = null;
        this.snackBar.open('Photo Uploaded', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        
    })
  }
}

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

}