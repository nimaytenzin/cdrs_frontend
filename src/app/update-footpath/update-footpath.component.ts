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
  fid: number;
  lap_id:number;
  d_status:string;
  width:number;
  lighting:number;
  friendliness:string;
  remarks:string;
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
  fid:number;
  update:boolean;

  developmentStatus: OPTIONS[]=[
    {id: "1", name: "Developed"},
    {id: "2", name: "Undeveloped"},
    {id: "3", name: "Under Development"},
    {id: "4", name: "UnderDeveloped"}
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
    this.fid = parseInt(sessionStorage.getItem('fid'));
    this.dataService.getSpecificFootpath(this.fid).subscribe(res => {
      console.log(res)
      if(res.length !== 0){
        this.update = true;
        this.updatePathForm.patchValue({
          developmentStatusControl:res[0].d_status,
          footpathWidthControl:res[0].width,
          lightingControl:res[0].lighting,
          friendlinessControl:res[0].friendliness,
          footpathRemarksControl:res[0].remarks
        });
      }else{
        this.update = false;
      }
    })
  }

  reactiveForms() {
    this.updatePathForm = this.fb.group({
      developmentStatusControl:[],
      footpathWidthControl:[],
      lightingControl:[],
      friendlinessControl:[],
      footpathRemarksControl:[],
    });    
    }

  updateFootpath(){
    this.Footpath.fid = this.fid;
    this.Footpath.lap_id = parseInt(sessionStorage.getItem('lap_id'));
    this.Footpath.d_status = this.updatePathForm.get('developmentStatusControl').value;
    this.Footpath.width = this.updatePathForm.get('footpathWidthControl').value;
    this.Footpath.lighting = this.updatePathForm.get('lightingControl').value;
    this.Footpath.friendliness = this.updatePathForm.get('friendlinessControl').value
    this.Footpath.remarks =this.updatePathForm.get('footpathRemarksControl').value;

    console.log(this.update)
    if(this.update !== true){
      this.dataService.postFootpath(this.Footpath).subscribe(res =>{
          this.dataService.footpathSetDone(this.fid).subscribe(res => {
            sessionStorage.setItem('ftype','footpath')
            sessionStorage.setItem('fid',sessionStorage.getItem('building_id'))
            this.router.navigate(['takephoto']);
            this.snackBar.open('Footpath Details Added', '', {
              duration: 5000,
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar']
            });
          })
      })
    }else{
      this.dataService.updateFootpath(this.fid,this.Footpath).subscribe(res => {
      })
      sessionStorage.setItem('ftype','footpath')
            sessionStorage.setItem('fid',sessionStorage.getItem('fid'))
            this.router.navigate(['takephoto']);
            this.snackBar.open('Footpath Details Updated', '', {
              duration: 5000,
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar']
            });
    }
     

  }

}
