import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/service/data.service';



@Component({
  selector: 'app-plot-details-dialog',
  templateUrl: './plot-details-dialog.component.html',
  styleUrls: ['./plot-details-dialog.component.scss']
})
export class PlotDetailsDialogComponent implements OnInit {

  plotData = <any>[];
  plotGroundData;
  

  constructor(
    private dialogRef: MatDialogRef<PlotDetailsDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService:DataService

  ) { }

  ngOnInit() {   
    console.log(this.plotGroundData)
    this.plotData = this.data.e
    console.log(this.plotData)
    this.dataService.getSpecificPlotDetails(this.plotData.gid).subscribe(res => {
      console.log("plot details", res.data)
      this.plotGroundData = res.data[0]
    })

  }

}
