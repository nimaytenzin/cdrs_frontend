import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from '../service/data.service';


interface OPTIONS{
  id: string,
  name: string
}

export class UpdatedPlot{
  gid: number;
  lapid:number;
  plot_id:string;
  developmentStatus:string;
  plotUse:string;
  onsiteParking:number;
  plotRemarks:string 
}


@Component({
  selector: 'app-update-plot',
  templateUrl: './update-plot.component.html',
  styleUrls: ['./update-plot.component.scss']
})


export class UpdatePlotComponent implements OnInit {
  updatePlotForm: FormGroup;
  disableForm = false;
  displayForm = true;
  Plot = new UpdatedPlot;

  developmentStatus: OPTIONS[]=[
    {id: "1", name: "Developed"},
    {id: "2", name: "Undeveloped"},
    {id: "3", name: "Under Development"},
    {id: "4", name: "UnderDeveloped"},
  ]
  
  plotuses: OPTIONS[]=[
    {id: "1", name: "Residential"},
    {id: "2", name: "Commercial"},
    {id: "3", name: "Mixed"},
    {id: "4", name: "Institutional"},
    {id: "2", name: "Services"},
    {id: "3", name: "Open Space"},
    {id: "4", name: "Others"},
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
    this.reactiveForms();
  }

  reactiveForms() {
    this.updatePlotForm = this.fb.group({
      developmentStatusControl:[],
      plotUseControl:[],
      onsiteParkingControl:[],
      plotRemarksControl:[]
    });    
    }
  submit(){
      this.updatePlot();
      this.snackBar.open('Plot Details Updated', '', {
        duration: 5000,
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
      this.router.navigate(['mapview']);
  }


  updatePlot(){
    this.Plot.gid = 1;
    this.Plot.lapid = 2;
    this.Plot.plot_id = "22.3"
    this.Plot.developmentStatus = this.updatePlotForm.get('developmentStatusControl').value;
    this.Plot.plotUse = this.updatePlotForm.get('plotUseControl').value;
    this.Plot.onsiteParking = this.updatePlotForm.get('onsiteParkingControl').value;
    this.Plot.plotRemarks = this.updatePlotForm.get('plotRemarksControl').value;

   
    this.dataService.updatePlot(this.Plot).subscribe(response=>{
         
      if(response.success === "true"){
        this.router.navigate(['dashboard',this.Plot]);
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

