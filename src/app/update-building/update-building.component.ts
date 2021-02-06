import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import {environment} from '../../environments/environment'

interface OPTIONS{
  id:string,
  name:string
}

export class Building{
  building_id: number;
  lap_id:number;
  d_status:string;
  construct_year:number;
  b_use:number;
  b_height:number;
  attic:number;
  jamthog:string;
  basement:string;
  facade:string;
  boundary_wall:string;
  balcony_project:string;
  b_color:string;
  remarks:string;
}

@Component({
  selector: 'app-update-building',
  templateUrl: './update-building.component.html',
  styleUrls: ['./update-building.component.scss']
})
export class UpdateBuildingComponent implements OnInit {
  updateBuildingForm:FormGroup;
  disableForm = false;
  displayForm = true;
  Building = new Building;
  buildingOwner:string;
  ownerContact:number;
  buildingDetails:any;
  updateSwitch:boolean;
  img:any;
  API_URL = environment.API_URL

  buildingUses:OPTIONS[] =[
    {id: "1", name: "Mixed Use"},
    {id: "2", name: "Residential"},
    {id: "3", name: "Commercial"},
    {id: "4", name: "Institutional"},
    {id: "5", name: "Industry"},
    {id: "6", name: "Services"},
    {id: "7", name: "Recreational"}
  ]

  buildingHeight:OPTIONS[]=[
    {id: "1", name: "G"},
    {id: "2", name: "G+1"},
    {id: "3", name: "G+2"},
    {id: "4", name: "G+3"},
    {id: "5", name: "G+4"},
    {id: "6", name: "G+5"}
  ]


  developmentStatus: OPTIONS[]=[
    {id: "1", name: "Developed"},
    {id: "2", name: "Undeveloped"},
    {id: "3", name: "Under Development"},
    {id: "4", name: "UnderDeveloped"}
  ]

  yesNo:OPTIONS[]=[
    {id: "1", name: "Yes"},
    {id: "2", name: "No"}
  ]

  existancyStatus:OPTIONS[]=[
    {id: "1", name: "Standing"},
    {id: "2", name: "Under Construction"},
    {id: "3", name: "Demolished"}

  ]
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.updateSwitch = false;


    this.Building.building_id = parseInt(sessionStorage.getItem('building_id'));
    this.dataService.getSpecificBuildingDetails(this.Building.building_id).subscribe(res => {
      this.buildingDetails = res
      console.log(res)
      this.buildingOwner = res.owner;
      this.ownerContact = res.contact;
      this.updateBuildingForm.patchValue({
        existancyStatusControl: res.status,
        constructionYearControl:res.year,
        buildingUseControl:res.use,
        buildingHeightControl:res.height,
        atticControl:res.attic,
        jamthogControl:res.jamthog,
        basementControl:res.basement
      });
    })
    this.reactiveForms();
    
  }

  reactiveForms() {
    this.updateBuildingForm = this.fb.group({
      existancyStatusControl:[],
      constructionYearControl:[],
      buildingUseControl:[],
      buildingHeightControl:[],
      atticControl:[],
      jamthogControl:[],
      basementControl:[],
      facadeControl:[],
      boundaryWallControl:[],
      balconyProjectionControl:[],
      buildingColorControl:[],
      buildingRemarksControl:[],
    });    
    }

  submit(){
      if(this.updateSwitch){
        alert('asdsd')
      }else{
        this.updateRoad();
      }
      this.snackBar.open('Building Details Updated', '', {
        duration: 5000,
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
      sessionStorage.setItem('ftype','building')
      sessionStorage.setItem('fid',sessionStorage.getItem('building_id'))
      this.router.navigate(['takephoto']);
  }

  updateRoad(){
    this.Building.building_id = 1;
    this.Building.lap_id = parseInt(sessionStorage.getItem('lapId'));
    this.Building.d_status = this.updateBuildingForm.get('existancyStatusControl').value;
    this.Building.construct_year = this.updateBuildingForm.get('constructionYearControl').value;
    this.Building.b_use = this.updateBuildingForm.get('buildingUseControl').value;
    this.Building.b_height = this.updateBuildingForm.get('buildingHeightControl').value;
    this.Building.attic = this.updateBuildingForm.get('atticControl').value
    this.Building.jamthog  = this.updateBuildingForm.get('jamthogControl').value
    this.Building.basement = this.updateBuildingForm.get('basementControl').value
    this.Building.facade = this.updateBuildingForm.get('facadeControl').value
    this.Building.boundary_wall = this.updateBuildingForm.get('boundaryWallControl').value
    this.Building.balcony_project = this.updateBuildingForm.get('balconyProjectionControl').value
    this.Building.b_color = this.updateBuildingForm.get('buildingColorControl').value
    this.Building.remarks = this.updateBuildingForm.get('buildingRemarksControl').value
    
    
    
    this.dataService.updateBuilding(this.Building).subscribe(response=>{
      if(response.success === "true"){
        this.router.navigate(['dashboard']);
        this.snackBar.open('Building Details Updated', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
      }else if(response.success === "false"){
        this.snackBar.open('Could not Update Building Details'+response.msg, '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }else{
        this.snackBar.open('Error Updating Building Details', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    })
  }


  

}
