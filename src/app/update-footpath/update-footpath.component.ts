import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from '../service/data.service';


interface OPTIONS{
  id:string,
  name:string
}

export class Footpaths{
  gid: number;
  lapid:number;
  developmentStatus:string;
  footpathWidth:number;
  lighting:number;
  footpathRemarks:string
}

@Component({
  selector: 'app-update-footpath',
  templateUrl: './update-footpath.component.html',
  styleUrls: ['./update-footpath.component.scss']
})
export class UpdateFootpathComponent implements OnInit {
  updatePathForm:FormGroup;
  disableForm = false;
  displayForm = true;
  Footpath = new Footpaths;

  developmentStatus: OPTIONS[]=[
    {id: "1", name: "Developed"},
    {id: "2", name: "Undeveloped"},
    {id: "3", name: "Under Development"},
    {id: "4", name: "UnderDeveloped"},
  ]

  lights: OPTIONS[]=[
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
    this.updatePathForm = this.fb.group({
      developmentStatusControl:[],
      footpathWidthControl:[],
      lightingControl:[],
      footpathRemarksControl:[],
    });    
    }
  submit(){
      this.updateFootpath();
      this.snackBar.open('Footpath Segment Details Updated', '', {
        duration: 5000,
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
      this.router.navigate(['mapview']);
  }

  updateFootpath(){
    this.Footpath.gid = 1;
    this.Footpath.lapid = 2;
    this.Footpath.developmentStatus = this.updatePathForm.get('developmentStatusControl').value;
    this.Footpath.footpathWidth = this.updatePathForm.get('footpathWidthControl').value;
    this.Footpath.lighting = this.updatePathForm.get('lightingControl').value;
    this.Footpath.footpathRemarks =this.updatePathForm.get('footpathRemarksControl').value;

    this.dataService.updatePath(this.Footpath).subscribe(response=>{
         
      if(response.success === "true"){
        this.router.navigate(['dashboard',this.Footpath]);
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
    }

    )
  }

}
