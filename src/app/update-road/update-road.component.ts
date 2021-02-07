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
  fid: number;
  lap_id:number;
  d_status:string;
  row:number;
  lanes:number;
  carriagewayWidth:number;
  median:number;
  parking_left:number;
  parking_right:number;
  light_left:number;
  light_right:number;
  drains_left:number;
  drains_right:number;
  remarks:string;
}

@Component({
  selector: 'app-update-road',
  templateUrl: './update-road.component.html',
  styleUrls: ['./update-road.component.scss']
})

export class UpdateRoadComponent implements OnInit {
  lap_id:number;
  fid:number;
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
    this.lap_id = parseInt(sessionStorage.getItem('lap_id'));
    this.fid = parseInt(sessionStorage.getItem('fid'));
    this.dataService.getSpecificRoadData(this.fid,this.lap_id).subscribe(res => {
      console.log('serverRes',res)
      this.updateRoadForm.patchValue({
        developmentStatusControl:res[0].d_status,
        rowControl:res[0].row,
        laneCountControl:res[0].lanes,
        carriagewayWidthControl:res[0].carriage_width,
        medianControl:res[0].median,

        streetParkingLeftControl:res[0].parking_left,
        streetParkingRightControl:res[0].parking_right,

        streetLightLeftControl:res[0].light_left,
        streetLightRightControl:res[0].light_right,

        drainsLeftControl:res[0].drain_left,
        drainsRightControl:res[0].drain_right,
        roadRemarksControl:res[0].remarks,
      });
    })
  }

  reactiveForms() {
    this.updateRoadForm = this.fb.group({
      developmentStatusControl:[],
      rowControl:[],
      laneCountControl:[],
      carriagewayWidthControl:[],
      medianControl:[],

      streetParkingLeftControl:[],
      streetParkingRightControl:[],

      streetLightLeftControl:[],
      streetLightRightControl:[],

      drainsLeftControl:[],
      drainsRightControl:[],
      drainsControl:[],
      roadRemarksControl:[],
    });    
    }

  updateRoad(){
    this.Road.fid = this.fid;
    console.log('lfid',this.fid)
    console.log('lap_id',this.lap_id) 
    this.Road.lap_id = this.lap_id;
    this.Road.d_status = this.updateRoadForm.get('developmentStatusControl').value;
    this.Road.row = this.updateRoadForm.get('rowControl').value;
    this.Road.lanes = this.updateRoadForm.get('laneCountControl').value;
    this.Road.carriagewayWidth = this.updateRoadForm.get('carriagewayWidthControl').value;
    this.Road.median = this.updateRoadForm.get('medianControl').value;
    this.Road.parking_left = this.updateRoadForm.get('streetParkingLeftControl').value;
    this.Road.parking_right = this.updateRoadForm.get('streetParkingRightControl').value;

    this.Road.light_left = this.updateRoadForm.get('streetLightLeftControl').value;
    this.Road.light_right = this.updateRoadForm.get('streetLightRightControl').value;

    this.Road.drains_left =this.updateRoadForm.get('drainsLeftControl').value;
    this.Road.drains_right = this.updateRoadForm.get('drainsRightControl').value;

    this.Road.remarks = this.updateRoadForm.get('roadRemarksControl').value;
    
    this.dataService.updateRoad(this.lap_id,this.fid, this.Road).subscribe(response=>{
        console.log(response)
    })
  }

}
