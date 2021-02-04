import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar, MatDialog, MatSidenav } from '@angular/material';

export class PlotInfo{
  plot_id: string;
  precinct: string;
  area:string;
  height: string;
  coverage: string;
  setback: string
}
export class RoadSegmentInfo{
  segment_id: string;
  length: number
}

export class FootpathInfo{
  segment_id: string;
  length:number
}

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss']
})
export class MapviewComponent implements OnInit {
  latitude: number;
  longitude: number;
  accuracy: number;
  plotMap: L.GeoJSON;
  roadMap:L.GeoJSON;
  footpathMap:L.GeoJSON;
  map: L.Map;
  layers: L.Control;
  isShowing:boolean;
  displayFootpathCard:boolean;
  displayPlotCard:boolean;
  displayRoadSegmentCard:boolean;

  plotInfo: PlotInfo;
  roadSegmentInfo: RoadSegmentInfo;
  footpathInfo : FootpathInfo;
  
   googleSatUrl = "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}";
   hybridMapUrl = "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}";
   cartoPositronUrl = "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png";
   osmBaseUrl = "https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png";


  greenMarker = L.icon({
    iconUrl: 'assets/marker-green.png',
    iconSize: [15, 15]
  });

  redMarker = L.icon({
    iconUrl: 'assets/marker-red.png',
    iconSize: [15, 15]
  });

  myMarker = L.icon({
    iconUrl: 'assets/marker-icon.png',
    iconSize: [20, 20]
  });
  

  plotStyle(feature) {
    return {
    fillColor: "white" ,
    weight: 0.5,
    opacity: 1,
    color: "black",
    fillOpacity: .8
   };
  }	

  doneStyle(feature) {
    return {
    fillColor: "red" ,
    weight: 0.5,
    opacity: 1,
    color: "black",
    fillOpacity: .8
   };
  }	
  
  highlight = {
    'fillColor': 'yellow',
    'weight': 2,
    'opacity': 1
  };


  roadStyle (feature){
    return {
    weight: 2,
    opacity: 1,
    color: "red",
    }
  };

  highlightRoadStyle = {
    // 'fillColor': 'yellow',
    'color': 'green',
    'weight': 2,
    'opacity': 1
  };
 

  footpathStyle (feature){
    return {
    weight: 2,
    opacity: 1,
    color: "green",
    dashArray: "4 4 4 4",
    }
  };
  highlightPathStyle = {
    // 'fillColor': 'yellow',
    'color': 'red',
    'weight': 2,
    'opacity': 1,
    dashArray: "",
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
     
    this.renderFeatures();
    this.displayFootpathCard = false;
    this.displayPlotCard = false;
    this.displayRoadSegmentCard = false;
    this.plotInfo = new PlotInfo();
    this.roadSegmentInfo = new RoadSegmentInfo();
    this.footpathInfo = new FootpathInfo();

  }

  toPlotForm(){
    this.router.navigate(['updateplot'])
  }
  toRoadForm(){
     this.router.navigate(['updateroad'])
  }
  toFootpathForm(){
    this.router.navigate(['updatepath'])
  }


  renderFeatures(){
 
    var cartoMap = L.tileLayer(this.cartoPositronUrl);
    var satelliteMap = L.tileLayer(this.googleSatUrl);
    var osmBaseMap = L.tileLayer(this.osmBaseUrl);

     
    this.map = L.map('map',{
      layers: [cartoMap],
      renderer: L.canvas({ tolerance: 3 })
    }).setView([ 27.4712,89.64191,], 13);
    
      var baseMaps = {
      "Satellite": satelliteMap,
      "Carto Map" : cartoMap,
      "OSM Base Map": osmBaseMap,
    };
   
 
    this.plotMap= L.geoJSON(null,{
      onEachFeature:  (feature, layer) => {  
        layer.on('click',(e) => {
          this.displayFootpathCard = false;
          this.displayPlotCard = true;
          this.displayRoadSegmentCard = false;
            
          this.plotInfo.plot_id = feature.properties.plot_id;
          this.plotInfo.precinct = feature.properties.precinct;
          this.plotInfo.area = feature.properties.area;
          this.plotInfo.height = feature.properties.height;
          this.plotInfo.coverage = feature.properties.coverage;
          this.plotInfo.setback = feature.properties.setback;

         if(this.isShowing === true){
           this.isShowing = false;
         } else{
           this.isShowing = true
         }            
        }
        );
      },
        style: this.plotStyle
    }).addTo(this.map)
   
    this.roadMap = L.geoJSON(null, {
      onEachFeature:  (feature, layer) => {
        layer.on('click',(e) => {
         
          this.displayFootpathCard = false;
          this.displayPlotCard = false;
          this.displayRoadSegmentCard = true;

          this.footpathInfo.segment_id = feature.properties.id;
          this.footpathInfo.length = feature.properties.length; 

          if(this.isShowing === true){
            this.isShowing = false;
          } else{
            this.isShowing = true
          }   
        });
      }, 
        style: this.roadStyle}) 

    this.footpathMap = L.geoJSON(null, {
      onEachFeature:  (feature, layer) => {
        layer.on('click', (e) => {

          this.displayFootpathCard = true;
          this.displayPlotCard = false;
          this.displayRoadSegmentCard = false;
          
          this.footpathInfo.segment_id = feature.properties.id;
          this.footpathInfo.length = Math.round(feature.properties.length);

          
          if(this.isShowing === true){
            this.isShowing = false;
          } else{
            this.isShowing = true
          }   

  
        });
      }, 
        style: this.footpathStyle}) 

        var overlayMaps = {
          "Plots": this.plotMap,
          "Roads": this.roadMap,
          "Footpath": this.footpathMap
        };
           
        this.layers = L.control.layers(baseMaps,overlayMaps).addTo(this.map);

        this.fetchGeojson()

  }

  fetchGeojson() {
    let thromde_id = sessionStorage.getItem('thromde_id');
    let lap_id = sessionStorage.getItem('lap_id')


    this.dataService.getPlotsByLap(lap_id).subscribe(res =>{
      this.plotMap.addData(res)
      this.plotMap.setStyle(this.doneStyle)
      console.log(this.plotMap)
      this.map.fitBounds(this.plotMap.getBounds())
    })

    // this.dataService.getPlotsByLap(lap_id).subscribe( res => {
    //   this.plotMap.addData(res)
    //   console.log(res)

    // })
  }

  goToDash(){
    this.router.navigate(['dashboard'])
  }

  getLocation(): void {
    if (navigator.geolocation) {
        const iconRetinaUrl = 'assets/mymarker.png';
        const iconUrl = 'assets/mymarker.png';
        const iconDefault = L.icon({
          iconRetinaUrl,
          iconUrl,
          iconSize: [20, 20],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        });

        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition((position) => {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.accuracy = position.coords.accuracy;

          if (this.accuracy > 100) {
            L.marker([this.latitude, this.longitude], {icon: iconDefault}).addTo(this.map)
                      
            this.map.flyTo([this.latitude, this.longitude], 19);
          } else {
            L.marker([this.latitude, this.longitude], {icon: iconDefault}).addTo(this.map)
            .openPopup();
            L.circle([this.latitude, this.longitude], {
              color: '#3498db',
              fillColor: '#3498db',
              fillOpacity: 0.3,
              radius: this.accuracy
            }).addTo(this.map);
            this.map.flyTo([this.latitude, this.longitude], 19);
          }
        }, err => {
          if (err.code === 0) {
            this.snackBar.open('Couldnot pull your location, please try again later', '', {
              verticalPosition: 'top',
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
          if (err.code === 1) {
            this.snackBar.open('Location service is disabled, please enable it and try again', '', {
              verticalPosition: 'top',
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
          if (err.code === 2) {
            this.snackBar.open('Your location couldnot be determined', '', {
              verticalPosition: 'top',
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
          if (err.code === 3) {
              this.snackBar.open('Couldnot get your location', '', {
                verticalPosition: 'top',
                duration: 5000,
                panelClass: ['error-snackbar']
              });
            }
        }, options);
      }
    }

    logout(){
      this.router.navigate(['login'])
    }
}
