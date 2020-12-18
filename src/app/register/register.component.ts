import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from '../service/data.service';

// interface Building Form
interface OwnershipType {
  id: string;
  name: string;
}

export class Building{
    building_id: number;
    nameOfTheBuilding:string;
    buildingOwnership:string;
    nameOfTheBuildingOwner:string;
    contactNumberBuilding:string;
    approvedDrawing:string;
    occupancyCertificate:string;
    associativePosition:string;
    existancyStatus: string;
    yearOfConstruction:string;
    yearOfRenovation:string;
    numberOfFloors:string;
    attic:string;
    stilt:string;
    jamthog:string;
    basement:string;
    buildingStyle:string;
    structureType:string;
    materialType:string;
    roofType:string;
    roofingMaterial:string;
    emergencyExit:string;
    lift:string;
    sewerTreatment:string;
    wasteCollection:string;
    dryWasteCollection:string;
    wetWasteCollection:string;
    waterSupply:string;
    buildingUse:string;
    parking:string;
    buildingRemarksstring:String;
}

interface AssociativePosition {
  id: string;
  name: string;
}
interface ExistancyStatus {
  id: string;
  name: string;
}
interface Attic {
  id: string;
  name: string;
}

interface Basement {
  id: string;
  name: string;
}

interface BuildingStyle {
  id: string;
  name: string;
}
interface StructureType {
  id: string;
  name: string;
}
interface MaterialType {
  id: string;
  name: string;
}

interface RoofType {
  id: string;
  name: string;
}

interface RoofingMaterial {
  id: string;
  name: string;
}
interface EmergencyExit {
  id: string;
  name: string;
}
interface Lift {
  id: string;
  name: string;
}
//
interface SewerTreatment {
  id: string;
  name: string;
}

interface WasteCollection {
  id: string;
  name: string;
}
interface WaterSupply {
  id: string;
  name: string;
}
interface BuildingUse {
  id: string;
  name: string;
}

interface Parking{
  id:string;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
  buildingForm: FormGroup;
  schoolForm: FormGroup;
  institutionForm: FormGroup;
  showScanner = false;
  buildingId: number;
  qrId: string;
  houseHoldId: number;
  unitUse: string;
  shopUse: string;
  unitId: number;
  
  latitude: number;
  longitude: number;
  accuracy: number;
  building: Building;

  disableForm = false;
  displayForm = true;
  displayCamera = false;
  showOtherType = false;
  displaySchoolForm=false;
  displayInstitutionForm=false;
  
  //i have added from here
  
  buildingOwnership:OwnershipType[]=[
    {id:'1', name:"Singly Owned"},
    {id:'2', name:"Jointly Owned"},
    {id:'3', name:"Flat Wise Ownership"},
  ];

  approvedDrawing:OwnershipType[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  occupancyCertificate:OwnershipType[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];

  associativePosition: AssociativePosition[]=[
    {id:'1', name:"Main"},
    {id:'2', name:"Ancillary"},
  ];
  existancyStatus:ExistancyStatus []=[
    {id:'1', name:"Standing"},
    {id:'2', name:"Under Construction"},
    {id:'3', name:"Demolished"},
    {id:'4', name:"Abandoned"},
  ];
  attic:Attic []=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];

  stilt: Attic[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  jamthog: Attic[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  basement:Basement[]=[
    {id:'1', name:"No Basement"},
    {id:'2', name:"1 Basement"},
    {id:'2', name:"2 Basement"},
  ];
  buildingStyle:BuildingStyle []=[
    {id:'1', name:"Contemporary"},
    {id:'2', name:"Traditional"},
    {id:'3', name:"Composite"},
  ];
  structureType:StructureType []=[
    {id:'1', name:"Framed"},
    {id:'2', name:"Load Bearing"},
    {id:'3', name:"Composite"},
    {id:'4', name:"Others"},
  ];

  materials: string[] = ['Brick Masonry', 'ACC block', 'Rammed Earth', 'Steel', 'Hollow Block', 'Stabilized Mud Block', 'Stone Masonry', 'Reinforced Concrete', 'Timbers', 'Others'];
  
  roofType: RoofType[]=[
    {id:'1', name:"Gable"},
    {id:'2', name:"Hipped"},
    {id:'3', name:"Composite"},
    {id:'4', name:"Others"},
  ];
  roofingMaterial:RoofingMaterial[]=[
    {id:'1', name:"CGI"},
    {id:'2', name:"Wooden Shingles"},
    {id:'3', name:"Slate"},
    {id:'6', name:"Others"},
  ];
  emergencyExit:EmergencyExit[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  lift:Lift[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
    {id:'3', name:"Provision Provided"},
  ];
  sewerTreatment:SewerTreatment[]=[
    {id:'1', name:"Individual Septic Tank"},
    {id:'2', name:"Communal Septic Tank"},
    {id:'3', name:"Thromde Sewerage Network"},
    {id:'4', name:"Others"},
  ];
  wasteCollection:WasteCollection[]=[
    {id:'1', name:"Thromde"},
    {id:'2', name:"Dzongkhag"},
    {id:'2', name:"Private Company"},
    {id:'3', name:"Individual"},
  ];
  
  waterSupply:WaterSupply[]=[
    {id:'1', name:"Thromde"},
    {id:'2', name:"Rural Water Supply Scheme"},
    {id:'3', name:"Private Individual"},
    {id:'4', name:"Private Community"},
    {id:'5', name:"Others"},

  ];
  buildingUse: BuildingUse[] = [
    {id:'1', name:"Residential"},
    {id:'2', name:"Commercial"},
    {id:'3', name:"Mixed Use"},
    {id:'4', name:"Institution"},
    {id:'5', name:"School"},
    {id:'6', name:"Religious"},
    {id:'7', name:"Hospital"},
    {id:'8', name:"Others"},
  ];
  parking:Parking[]=[
    {id:'1', name:"Designated Onstreet"},
    {id:'2', name:"Un-designated Onstreet"},
    {id:'3', name:"Offstreet"},
    {id:'4', name:"Private Parking"}
  ];
  numberOfFloors:Parking[]=[
    {id:'1', name:"G"},
    {id:'2', name:"G+1"},
    {id:'3', name:"G+2"},
    {id:'4', name:"G+3"},
    {id:'5', name:"G+4"},
    {id:'6', name:"G+5"},
    {id:'7', name:"G+6"},
    {id:'8', name:"G+7"},

  ];
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar

  ) {
    this.building = new Building();
  }

  ngOnInit() {
    this.buildingId = Number(sessionStorage.getItem('buildingId'));
    this.reactiveForms();
  }


  changeDiff($event){
    this.displayInstitutionForm = false;
    this.displaySchoolForm = false;

    if($event.value==="4"){
      this.displayInstitutionForm= true;
    }
    if($event.value==="5"){
      this.displaySchoolForm= true;
    }
  }

   // control

   reactiveForms() {
    this.buildingForm = this.fb.group({
      nameOfTheBuildingControl:[],
      buildingOwnershipControl:[],
      nameOfTheBuildingOwnerControl:[],
      contactNumberBuildingControl:[],
      approvedDrawingsControl:[],
      occupancyCertificateControl:[],
      associativePositionControl:[],
      existancyStatusControl:[],
      yearOfConstructionControl:[],
      yearOfRenovationControl:[],
      numberOfFloorsControl:[],
      atticControl:[],
      stiltControl:[],
      jamthogControl:[],
      basementControl:[],
      buildingStyleControl:[],
      structureTypeControl:[],
      roofTypeControl:[],
      roofingMaterialControl:[],
      emergencyExitControl:[],
      liftControl:[],
      sewerTreatmentControl:[],
      wasteCollectionControl:[],
      dryWasteCollectionControl:[],
      wetWasteCollectionControl:[],
      waterSupplyControl:[],
      buildingUseControl:[],
      parkingControl:[],
      buildingRemarksControl:[],
      });
    this.schoolForm = this.fb.group({
        schoolNameControl:[],
        schoolEstablishmentYearControl:[],
        schoolStaffMaleControl:[],
        schoolStaffFemaleControl:[],
        studentsMaleControl:[],
        studentsFemaleControl:[],
        vehicleNumberControl:[]
        });
    this.institutionForm = this.fb.group({
      instituteNameControl:[],
      instituteEstablishmentYearControl:[],
      institueStaffMaleControl:[],
      instituteStaffFemaleControl:[],
      instituteVehicleControl:[],
      });
  }


  submit(){
    // this.registerBuilding();
    this.snackBar.open('Building Registration Complete', '', {
      duration: 5000,
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar']
    });
    this.router.navigate(['dashboard',this.buildingId]);
  }
  registerBuilding(){
    // this.building.building_id=Number(sessionStorage.getItem('buildingId'));
    this.building.building_id=Number(sessionStorage.getItem('buildingId'));
    this.building.nameOfTheBuilding=this.buildingForm.get('nameOfTheBuildingControl').value;
    this.building.buildingOwnership=this.buildingForm.get('buildingOwnershipControl').value;
    this.building.nameOfTheBuildingOwner=this.buildingForm.get('nameOfTheBuildingOwnerControl').value;
    this.building.contactNumberBuilding=this.buildingForm.get('contactNumberBuildingControl').value;
    this.building.approvedDrawing=this.buildingForm.get('approvedDrawingControl').value;
    this.building.occupancyCertificate=this.buildingForm.get('occupancyCertificateControl').value;
    this.building.associativePosition=this.buildingForm.get('associativePositionControl').value;
    this.building.existancyStatus=this.buildingForm.get('existancyStatusControl').value;
    this.building.yearOfConstruction=this.buildingForm.get('yearOfConstructionControl').value;
    this.building.yearOfRenovation=this.buildingForm.get('yearOfRenovationControl').value;
    this.building.numberOfFloors=this.buildingForm.get('numberOfFloorsControl').value;
    this.building.attic=this.buildingForm.get('atticControl').value;
    this.building.stilt=this.buildingForm.get('stiltControl').value;
    this.building.jamthog=this.buildingForm.get('atticControl').value;
    this.building.basement=this.buildingForm.get('jamthogControl').value;
    this.building.buildingStyle=this.buildingForm.get('buildingStyleControl').value;
    this.building.structureType=this.buildingForm.get('structureTypeControl').value;
    this.building.materialType=this.buildingForm.get('materialTypeControl').value;
    this.building.roofType=this.buildingForm.get('roofTypeControl').value;
    this.building.roofingMaterial=this.buildingForm.get('roofingMaterialControl').value;
    this.building.emergencyExit=this.buildingForm.get('emergencyExitControl').value;
    this.building.lift=this.buildingForm.get('liftControl').value;
    this.building.sewerTreatment=this.buildingForm.get('sewerTreatmentControl').value;
    this.building.wasteCollection=this.buildingForm.get('wasteCollectionControl').value;
    this.building.dryWasteCollection=this.buildingForm.get('dryWasteCollectionControl').value;
    this.building.wetWasteCollection=this.buildingForm.get('wetWasteCollectionControl').value;
    this.building.waterSupply=this.buildingForm.get('waterSupplyControl').value;
    this.building.buildingUse=this.buildingForm.get('buildingUseControl').value;
    this.building.parking=this.buildingForm.get('parkingControl').value;
    this.building.buildingRemarksstring=this.buildingForm.get('buildingRemarksControl').value;

    this.dataService.postBuilding(this.building).subscribe(response=>{
      console.log(response.status);
      if(response.success === "true"){
        this.router.navigate(['dashboard',this.buildingId]);
        this.snackBar.open('Building Registration Complete', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
      }else if(response.success === "false"){
        this.snackBar.open('Could not register Household'+response.msg, '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }else{
        this.snackBar.open('Error registering Building', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    })
  }
}
