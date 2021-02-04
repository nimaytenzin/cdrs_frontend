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
  fid: number;
  lap_id:number;
  plot_id:string;
  d_status:string;
  plot_use:string;
  max_height:string;
  setback_e:string;
  parking:number;
  remarks:string
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


  plot_id = sessionStorage.getItem('plot_id');
  precinct = sessionStorage.getItem('precinct');
  height = sessionStorage.getItem('height');
  coverageC = sessionStorage.getItem('coverage');
  setback = sessionStorage.getItem('setback')

  developmentStatus: OPTIONS[]=[
    {id: "1", name: "Developed"},
    {id: "2", name: "Undeveloped"},
    {id: "3", name: "Under Development"}
  ]
  
  yesNo:OPTIONS[]=[
    {id: "1", name: "Yes"},
    {id: "2", name: "No"}
  ]
  plotuses: OPTIONS[]=[
    {id: "1", name: "Mixed"},
    {id: "1", name: "Residential"},
    {id: "2", name: "Commercial"},
    {id: "3", name: "Open Spaces"},
    {id: "4", name: "Institutional"},
    {id: "2", name: "Services"},
    {id: "3", name: "Recreational"},
    {id: "4", name: "Others"}
  ]

  
  coverage:OPTIONS[]=[
    {id: "1", name: "Maintained"},
    {id: "2", name: "Not Maintained"}
  ]


  buildingHeight:OPTIONS[]=[
    {id: "1", name: "G"},
    {id: "2", name: "G+1"},
    {id: "3", name: "G+2"},
    {id: "4", name: "G+3"},
    {id: "5", name: "G+4"},
    {id: "6", name: "G+5"},
    {id: "6", name: "G+6"}
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
      maxHeightControl:[],
      setbackEnControl:[],
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

  clearCookie(){
    sessionStorage.removeItem('plot_id')
  }

  updatePlot(){
    this.Plot.fid = parseInt(sessionStorage.getItem('fid'));
    this.Plot.lap_id = parseInt(sessionStorage.getItem('lap_id'));
    this.Plot.plot_id = sessionStorage.getItem('plot_id')
    this.Plot.d_status = this.updatePlotForm.get('developmentStatusControl').value;
    this.Plot.plot_use = this.updatePlotForm.get('plotUseControl').value;
    this.Plot.max_height = this.updatePlotForm.get('maxHeightControl').value;
    this.Plot.setback_e = this.updatePlotForm.get('setbackEnControl').value;
    this.Plot.parking = this.updatePlotForm.get('onsiteParkingControl').value;
    this.Plot.remarks = this.updatePlotForm.get('plotRemarksControl').value;

    this.dataService.updatePlot(this.Plot).subscribe(response=>{
       if(response.status === "Success"){
        this.clearCookie()
           this.router.navigate(['mapview']);
           this.snackBar.open('Plot Details Updated', '', {
             duration: 5000,
             verticalPosition: 'bottom',
             panelClass: ['success-snackbar']
        
        })
       }
    })
  }
  

}

// if(response.success === "true"){
//   this.clearCookie()
//    this.router.navigate(['dashboard',this.Plot]);
//    this.snackBar.open('Plot Details Updated', '', {
//      duration: 5000,
//      verticalPosition: 'bottom',
//      panelClass: ['success-snackbar']

// })

// }else if(response.success === "false"){
// this.clearCookie()
// this.snackBar.open('Could not Update Plot Details'+response.msg, '', {
//  duration: 5000,
//  verticalPosition: 'bottom',
//  panelClass: ['error-snackbar']
// });
// }else{
// this.clearCookie()
// this.snackBar.open('Error Updating Plot Details', '', {
//  duration: 5000,
//  verticalPosition: 'bottom',
//  panelClass: ['error-snackbar']
// });
// }