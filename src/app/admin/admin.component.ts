import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import * as L from 'leaflet';
import {take} from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatSnackBar, MatDialog, MatSidenav } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  googleSatUrl = "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}";
  cartoPositronUrl = "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png";
  lapName = "Dechencholing Lap"
  precinctMap:any;
  plotData:any
  totalPlots = 0;
  totalPopulation = 34000;
  totalLandArea = "23000 Sq.M";

  feedback = new Feedback
  feedbackForm:FormGroup

  @ViewChild('autosize',{static:false}) autosize: CdkTextareaAutosize;

  constructor(
    private fb:FormBuilder,
    private dataService:DataService,
    private _ngZone: NgZone,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    console.log(this.dataService.getPrecicntColor("UV1"))
    this.renderMap(this.dataService)
    this.reactiveForms()
  }

  reactiveForms() {
    this.feedbackForm = this.fb.group({
      name:[],
      email:[],
      feedbacks:[]
    });    
  }

  renderMap(dataS){
    this.map = L.map('map').setView([ 27.4712,89.64191,], 13);    
    var cartoMap = L.tileLayer(this.cartoPositronUrl).addTo(this.map);


    function getPrecicntColor(precicnt){
      switch(precicnt) {
        case "E1":
          return {
            name:"Environmental Conservation",
            color: "rgb(56,167,0)"
          }
          break;
        case "E2":
          return {
            name:"Forest Environments",
            color: "rgb(224,88,186)"
          }
          break;
        case "EN":
          return {
            name:"Endowment for future",
            color: "rgb(239,135,126)"
          }
          break;
        case "G2":
          return {
            name:"Green Space System",
            color: "rgb(75,75,209)"
          }
          break;
        case "I":
          return {
            name:"Institutional",
            color: "rgb(85,224,245)"
          }
          break;
        case "NN":
          return {
            name:"Neighborhood Node",
            color: "rgb(212,210,97)"
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
            color: "rgb(128,83,112)"
          }
          break;
        case "UH":
          return {
            name:"Urban Hub",
            color: "rgb(207,103,156)"
          }
          break;
        case "UV1":
          return {
            name:"Urban Village Core",
            color: "rgb(125,66,184)"
          }
          break;
        case "UV-1":
          return {
            name:"Urban Village Core",
            color: "rgb(125,66,184)"
          }
          break;
        case "UV2-MD":
          return {
            name:"Urban Village Medium Density",
            color: "rgb(129,51,67)"
          }
          break;
        case "UV-2MD":
          return {
            name:"Urban Village Medium Density",
            color: "rgb(129,51,67)"
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
     
    })
    this.fetchGeojson()
    
  }

  fetchGeojson(){
    this.dataService.getPlotsByLap(1).subscribe(res =>{
      this.precinctMap.addData(res).addTo(this.map)
      this.totalPlots = res.features.length;
      this.map.fitBounds(this.precinctMap.getBounds())      
    })
  }

  submitFeedback(){
    this.feedback.name = this.feedbackForm.get('name').value
    this.feedback.email = this.feedbackForm.get('email').value
    this.feedback.feedback = this.feedbackForm.get('feedbacks').value

    console.log(this.feedback)

    this.snackBar.open('Thank you for your Feedback la', '', {
      duration: 5000,
      verticalPosition: 'bottom',
      panelClass: ['info-snackbar']
    });
  }


}
