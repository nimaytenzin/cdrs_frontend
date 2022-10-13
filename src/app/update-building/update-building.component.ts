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

interface OPTIONS2{
  id:string,
  name:boolean
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
  API_URL = environment.API_URL;
  hhBuildingData = {
    existancyStatus:"",
    constructionYear:"",
    buildingUse:"",
    floors:"",
    attic:"",
    basement:"",
    jamthog:""
  };
  hhUnitData =[];

  buildingUses:OPTIONS[] =[
    {id: "1", name: "Mixed Use"},
    {id: "2", name: "Residential"},
    {id: "3", name: "Commercial"},
    {id: "4", name: "Institutional"},
    {id: "5", name: "Industry"},
    {id: "6", name: "Services"},
    {id: "7", name: "Recreational"},
    {id: "7", name: "Heritage"}
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

  yesNo:OPTIONS2[]=[
    {id: "1", name: true},
    {id: "2", name: false}
  ]

  yesNo2:OPTIONS[]=[
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

    this.dataService.getHHsurveyBuildingData(this.Building.structure_id).subscribe(res1 =>{
      this.hhBuildingData = res1.data
      console.log(res1, "BUILDING DATA")
      this.dataService.getHHsurveyUnitData(this.Building.structure_id).subscribe(res2 =>{
        this.hhUnitData = res2.data
        console.log(this.hhUnitData)
        this.dataService.getSpecificBuildingDetails(this.Building.structure_id).subscribe(res3 => {
          this.buildingDetails = res3
          console.log(res3, "response three")
          if(res3.status !== null){
            this.updateBuildingForm.patchValue({
              existancyStatusControl: res3.status,
              constructionYearControl:res3.year,
              buildingUseControl:res3.use,
              buildingHeightControl:res3.height,
              atticControl:res3.attic === "Yes"? true:false ,
              jamthogControl:res3.jamthog === "Yes"? true:false,
              basementControl:res3.basement === "Yes"? true:false,
              facadeControl:res3.facade,
              boundaryWallControl:res3.b_wall,
              balconyProjectionControl:res3.balcony,
              buildingColorControl:res3.color,
              parkingControl:res3.parking,
              residentialUnitControl:res3.res_units,
              commercialUnitControl:res3.com_units,
              officeUnitControl:res3.off_units,
              buildingRemarksControl:res3.remarks,
            });
          }else{
            let residentialUnits =0;
            let commercialUnits =0;
            let officeUnits = 0
            this.hhUnitData.forEach(unit =>{
             if(unit.unitUse === "Commercial"){
              commercialUnits += 1 
             }else if (unit.unitUse === "Residential"){
               residentialUnits +=1
             }else if(unit.unitUse === "Office"){
               officeUnits +=1
             }
            })
            this.updateBuildingForm.patchValue({
              existancyStatusControl: this.hhBuildingData.existancyStatus,
              constructionYearControl:this.hhBuildingData.constructionYear,
              buildingUseControl:this.hhBuildingData.buildingUse,
              buildingHeightControl:this.hhBuildingData.floors,
              atticControl:this.hhBuildingData.attic,
              jamthogControl:this.hhBuildingData.jamthog,
              basementControl:this.hhBuildingData.basement,
              residentialUnitControl:residentialUnits,
              commercialUnitControl:commercialUnits,
              officeUnitControl:officeUnits,
              parkingControl:0
            });
          }
        
         
        })
      })
      
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
    this.Building.lap_id = parseInt(sessionStorage.getItem('lap_id'));
    this.Building.status = this.updateBuildingForm.get('existancyStatusControl').value;
    this.Building.year = this.updateBuildingForm.get('constructionYearControl').value;
    this.Building.use = this.updateBuildingForm.get('buildingUseControl').value;
    this.Building.height = this.updateBuildingForm.get('buildingHeightControl').value;
    this.Building.attic = this.updateBuildingForm.get('atticControl').value === true? "Yes" : "No"
    this.Building.jamthog  = this.updateBuildingForm.get('jamthogControl').value=== true? "Yes" : "No"
    this.Building.basement = this.updateBuildingForm.get('basementControl').value=== true? "Yes" : "No"
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
