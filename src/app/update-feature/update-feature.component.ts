import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Point } from 'leaflet';
import { DataService } from '../service/data.service';
interface OPTIONS{
  id: string,
  name: string
}


export class PointFeature{
  lap_id: number;
  type: string;
  remarks: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-update-feature',
  templateUrl: './update-feature.component.html',
  styleUrls: ['./update-feature.component.scss']
})
export class UpdateFeatureComponent implements OnInit {
  updateFeatureForm:FormGroup
  updateSwitch=false;
  pointFeatureDetails = new PointFeature;
  id:number
 types:OPTIONS[] =[
    {id: "1", name: "Bus Stop"},
    {id: "2", name: "Electric Pole"},
    {id: "3", name: "Issues"},
    {id: "4", name: "Telephone Pole"},
    {id: "5", name: "Street Lights"},
    {id: "6", name: "Others"}
  ]

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private snackBar: MatSnackBar,
    private dataservice:DataService

  ) { }

  ngOnInit() {
    this.reactiveForms()
    this.id = parseInt(sessionStorage.getItem('fid'))

    if(!this.updateSwitch){
      this.dataservice.getSpecificPoint(this.id).subscribe(res => {
        if(res.status === "Success"){
          console.log(res)
          this.updateFeatureForm.patchValue({
            typeControl: res.data.type,
            remarksControl: res.data.remarks
          });
          this.updateSwitch = true
        }else{
          this.updateSwitch = false
        }  
      })
    }
    

  }

  reactiveForms() {
    this.updateFeatureForm = this.fb.group({
      typeControl:[],
      remarksControl:[]
    });    
  }

  addFeature(){
    this.pointFeatureDetails.lap_id = parseInt(sessionStorage.getItem("lap_id"))
    this.pointFeatureDetails.lat = parseFloat(sessionStorage.getItem("lat"))
    this.pointFeatureDetails.lng = parseFloat(sessionStorage.getItem("lng"))
    this.pointFeatureDetails.type = this.updateFeatureForm.get('typeControl').value;
    this.pointFeatureDetails.remarks = this.updateFeatureForm.get('remarksControl').value;

    if(this.updateSwitch === false){
      this.dataservice.addPointFeature(this.pointFeatureDetails).subscribe(res => {
        if(res.status === "Success"){
          sessionStorage.setItem('ftype', 'pointFeature')
          sessionStorage.setItem('fid', res.data.id )
          this.router.navigate(['takephoto'])
          this.snackBar.open('Feature Details Added', '', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
       })
        }else{
          this.snackBar.open('Network Error', '', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
       })
        }
      })
    }else{
      //update
      this.dataservice.updatePoint(this.id,this.pointFeatureDetails).subscribe(res => {
        console.log(res)
        if(res.status === "success"){
          sessionStorage.setItem('ftype', 'pointFeature')
            this.router.navigate(['takephoto'])
            this.snackBar.open('Feature Details Updated', '', {
              duration: 5000,
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar']
            })
        }else{
          this.snackBar.open('Network Error', '', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          })
        }
      })
      
    }

    

    
  }

  end(){
    sessionStorage.removeItem('fid')
    sessionStorage.removeItem('lat')
    sessionStorage.removeItem('lng')
    sessionStorage.removeItem('ftype')
    this.router.navigate(['mapview'])
  }

}
