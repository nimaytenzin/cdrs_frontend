import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import * as L from 'leaflet';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlotDetailsDialogComponent } from '../dialogs/plot-details-dialog/plot-details-dialog.component';


export class Feedback{
  name:string;
  email:string;
  feedback:string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  map: L.Map;
  map2:L.Map ;

  googleSatUrl = "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}";
  cartoPositronUrl = "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png";
  lapName = "Dechencholing Lap"
  precinctMap:any;
  plotData:any
  totalPlots = 0;
  totalPopulation = 0;
  totalLandArea;


  //precinct stats
  precinctLabels =[];
  precicntPlotCounts=[];
  precinctArea;
  
  feedback = new Feedback
  feedbackForm:FormGroup;


  constructor(
    private fb:FormBuilder,
    private dataService:DataService,
    public dialog: MatDialog,
    private _ngZone: NgZone,
    private snackBar: MatSnackBar) {}
    

  ngOnInit() {
    this.renderMap(this.dialog);
    this.reactiveForms();
    this.fetchChartData()
    this.dataService.getPlotDetailsByLap(2).subscribe(res => {
      this.totalLandArea = parseFloat(res.sum).toFixed(2) + "Acres";
      this.totalPlots = res.count;
    })

    this.dataService.getDevelopmentStatusStats(2).subscribe(res => {
      console.log(res)
    })

  
    
  }

  reactiveForms() {
    this.feedbackForm = this.fb.group({
      name:[],
      email:[],
      feedbacks:[]
    });    
  }



  fetchChartData(){
    this.dataService.getPrecinctStats(2).subscribe(res => {
      this.precinctLabels = res[0];
      this.precicntPlotCounts = res[1]
      this.precinctArea = res[2]
   
    })

  }

  renderMap(dialog){
    this.map = L.map('map').setView([ 27.4712,89.64191,], 13);        
    var cartoMap = L.tileLayer(this.cartoPositronUrl).addTo(this.map);

    var highlight = {
      'color': 'red',
      'weight': 2
    };


    function getPrecicntColor(precicnt){
      switch(precicnt) {
        case "E1":
          return {
            name:"Environmental Conservation",
            color: "#6fdd6d"
          }
          break;
        case "E2":
          return {
            name:"Forest Environments",
            color: "#719501"
          }
          break;
        case "EN":
          return {
            name:"Endowment for future",
            color: "#ffdf80"
          }
          break;
        case "G2":
          return {
            name:"Green Space System",
            color: "#00dd6f"
          }
          break;
        case "I":
          return {
            name:"Institutional",
            color: "#7ea0fb"
          }
          break;
        case "NN":
          return {
            name:"Neighborhood Node",
            color: "#ff7f00"
          }
          break;
        case "RH":
          return {
            name:"Religious Institution",
            color: "rgb(175,135,205)"
          }
          break;
        case "SP":
          return {
            name:"Public Use and Service Area",
            color: "#ff7f7e"
          }
          break;
        case "UH":
          return {
            name:"Urban Hub",
            color: "#c07fff"
          }
          break;
        case "UV1":
          return {
            name:"Urban Village Core",
            color: "#ddc16e"
          }
          break;
        case "UV-1":
          return {
            name:"Urban Village Core",
            color: "#ddc16e"
          }
          break;
        case "UV2-MD":
          return {
            name:"Urban Village Medium Density",
            color: "#b9b800"
          }
          break;
        case "UV-2MD":
          return {
            name:"Urban Village Medium Density",
            color: "#b9b800"
          }
          break;
        case "Workshop":
          return {
            name:"Workshop",
            color: "rgb(128,66,141)"
          }
          break;
        default:
          return {
            name:"Not assigned",
            color: "white"
          }
      }   
    }

    this.precinctMap= L.geoJSON(null,{
      style: function (feature) {
        return {
            fillColor: getPrecicntColor(feature.properties.precinct).color,
            weight: 0.5,
            opacity: 1,
            color: "white",
            fillOpacity: .5
        };
      },
      onEachFeature(feature,layer){
        layer.on('click', (e) => {
           e.target.setStyle(highlight)
           const confirmDialog = dialog.open(PlotDetailsDialogComponent, {
            width: '50%',
            position: { right: '5%', top: '10%'},
            data:{
              e: e.target.feature.properties
            }
          });

          confirmDialog.afterClosed().subscribe(res => {
            e.target.setStyle(  function () {
              return {
                  weight: 0.5,
                  opacity: 1,
                  color: "white",
                  fillOpacity: .5
              }
            }()
            )
          })
          
        })
        
      }     
    })
    this.fetchGeojson()
   
    
  }

  openDialog(){
 
  }

  fetchGeojson(){
    this.dataService.getPlotsByLap(2).subscribe(res =>{
      this.precinctMap.addData(res).addTo(this.map)
      this.totalPlots = res.features.length;
      this.map.fitBounds(this.precinctMap.getBounds())      
    })
  }

  submitFeedback(){
    this.feedback.name = this.feedbackForm.get('name').value
    this.feedback.email = this.feedbackForm.get('email').value
    this.feedback.feedback = this.feedbackForm.get('feedbacks').value

    this.snackBar.open('Thank you for your Feedback la', '', {
      duration: 5000,
      verticalPosition: 'bottom',
      panelClass: ['info-snackbar']
    });
  }


}
