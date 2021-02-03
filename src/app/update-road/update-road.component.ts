import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from '../service/data.service';

interface OPTIONS{
  id:string,
  name:string
}

export class Roads{
  gid: number;
  lapid:number;
  developmentStatus:string;
  row:number;
  laneCount:number;
  carriagewayWidth:number;
  median:number;
  streetParking:string;
  streetPath:string;
  streetLight:string;
  drains:string;
  roadRemarks:string;
}

@Component({
  selector: 'app-update-road',
  templateUrl: './update-road.component.html',
  styleUrls: ['./update-road.component.scss']
})

export class UpdateRoadComponent implements OnInit {

  updateRoadForm:FormGroup;
  disableForm = false;
  displayForm = true;
  Road = new Roads;

  developmentStatus: OPTIONS[]=[
    {id: "1", name: "Developed"},
    {id: "2", name: "Undeveloped"},
    {id: "3", name: "Under Development"}
  ]

  streetLight: OPTIONS[]=[
    {id: "1", name: "Yes"},
    {id: "2", name: "No"},
  ]

  drains: OPTIONS[]=[
    {id: "1", name: "Yes"},
    {id: "2", name: "No"},
  ]
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.reactiveForms()
  }

  reactiveForms() {
    this.updateRoadForm = this.fb.group({
      developmentStatusControl:[],
      rowControl:[],
      laneCountControl:[],
      carriagewayWidthControl:[],
      medianControl:[],
      streetParkingControl:[],
      streetPathControl:[],
      streetLightControl:[],
      drainsControl:[],
      roadRemarksControl:[],
    });    
    }
  submit(){
      this.updateRoad();
      this.snackBar.open('Road Segment Details Updated', '', {
        duration: 5000,
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
      this.router.navigate(['mapview']);
  }

  updateRoad(){
    this.Road.gid = 1;
    this.Road.lapid = 2;
    this.Road.developmentStatus = this.updateRoadForm.get('developmentStatusControl').value;
    this.Road.row = this.updateRoadForm.get('rowControl').value;
    this.Road.laneCount = this.updateRoadForm.get('laneCountControl').value;
    this.Road.carriagewayWidth = this.updateRoadForm.get('carriagewayWidthControl').value;
    this.Road.median = this.updateRoadForm.get('medianControl').value;
    this.Road.streetParking = this.updateRoadForm.get('streetParkingControl').value;
    this.Road.streetPath = this.updateRoadForm.get('streetPathControl').value;
    this.Road.streetLight = this.updateRoadForm.get('streetLightControl').value;
    this.Road.drains =this.updateRoadForm.get('drainsControl').value;
    this.Road.roadRemarks = this.updateRoadForm.get('roadRemarksControl').value;

    this.dataService.updateRoad(this.Road).subscribe(response=>{
      if(response.success === "true"){
        this.router.navigate(['dashboard']);
        this.snackBar.open('Plot Details Updated', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
      }else if(response.success === "false"){
        this.snackBar.open('Could not Update Plot Details'+response.msg, '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }else{
        this.snackBar.open('Error Updating Plot Details', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    })
  }

}
