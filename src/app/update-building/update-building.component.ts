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
  structure_id: number;
  lap_id: number;
  owner: string;
  contact: string;
  year: string;
  status: string;
  use:string;
  height: string;
  attic: string;
  jamthog: string;
  basement: string;
  stilts: string;
  facade: string;
  b_wall: string;
  balcony: string;
  color: string;
  parking:number;
  res_units:number;
  com_units:number;
  off_units:number;
  remarks: string;
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
    this.Building.structure_id = parseInt(sessionStorage.getItem('building_id'));
    this.dataService.getSpecificBuildingDetails(this.Building.structure_id).subscribe(res => {
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
        basementControl:res.basement,
        facadeControl:res.facade,
        boundaryWallControl:res.b_wall,
        balconyProjectionControl:res.balcony,
        buildingColorControl:res.color,
        parkingControl:res.parking,
        residentialUnitControl:res.res_units,
        commercialUnitControl:res.com_units,
        officeUnitControl:res.off_units,
        buildingRemarksControl:res.remarks,
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
      parkingControl:[],
      residentialUnitControl:[],
      commercialUnitControl:[],
      officeUnitControl:[],
      buildingRemarksControl:[],
    });    
    }

  updateBuilding(){
    this.Building.structure_id =parseInt( sessionStorage.getItem('building_id'));
    this.Building.lap_id = parseInt(sessionStorage.getItem('lapId'));
    this.Building.status = this.updateBuildingForm.get('existancyStatusControl').value;
    this.Building.year = this.updateBuildingForm.get('constructionYearControl').value;
    this.Building.use = this.updateBuildingForm.get('buildingUseControl').value;
    this.Building.height = this.updateBuildingForm.get('buildingHeightControl').value;
    this.Building.attic = this.updateBuildingForm.get('atticControl').value
    this.Building.jamthog  = this.updateBuildingForm.get('jamthogControl').value
    this.Building.basement = this.updateBuildingForm.get('basementControl').value
    this.Building.facade = this.updateBuildingForm.get('facadeControl').value
    this.Building.b_wall = this.updateBuildingForm.get('boundaryWallControl').value
    this.Building.balcony = this.updateBuildingForm.get('balconyProjectionControl').value
    this.Building.color = this.updateBuildingForm.get('buildingColorControl').value
    this.Building.parking = this.updateBuildingForm.get('parkingControl').value
    this.Building.res_units = this.updateBuildingForm.get('residentialUnitControl').value
    this.Building.com_units = this.updateBuildingForm.get('commercialUnitControl').value
    this.Building.off_units = this.updateBuildingForm.get('officeUnitControl').value
    this.Building.remarks = this.updateBuildingForm.get('buildingRemarksControl').value

    this.dataService.updateBuilding(this.Building,this.Building.structure_id).subscribe(response=>{
      if(response.status === "success"){
        this.dataService.buildingSetDone(this.Building.structure_id).subscribe(
          res=>{
           sessionStorage.setItem('ftype','building')
           sessionStorage.setItem('fid',sessionStorage.getItem('building_id'))
           this.router.navigate(['takephoto']);
           this.snackBar.open('Building Details Updated', '', {
             duration: 5000,
             verticalPosition: 'bottom',
             panelClass: ['success-snackbar']
           });
          }
         )
      }else{
        this.snackBar.open('Failed Try Again', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
      }

     
       
    })
  }

  back(){
    this.router.navigate(['mapview'])
    sessionStorage.removeItem('building_id')
  }

  

}
