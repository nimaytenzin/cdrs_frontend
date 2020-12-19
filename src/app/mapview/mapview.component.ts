import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { environment } from '../../environments/environment';


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
    this.renderBaseMap();
  }

  renderBaseMap() {
    
  

  
  
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
      onEachFeature: function (feature, layer) {  
        layer.on('click',(e) => {
          this.router.navigate(['dashboard']);         
        });},
        style: this.plotStyle
    })
   
    this.roadMap = L.geoJSON(null, {
      onEachFeature: function (feature, layer) {
        layer.on('click',function(e){
             console.log(e)
        });
      }, 
        style: this.roadStyle}) 

    this.footpathMap = L.geoJSON(null, {
      onEachFeature: function (feature, layer) {
        layer.on('click',function(e){
              //onlcik function
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
    this.dataService.getPlotData().subscribe(response => {
      this.plotMap.addData(response).addTo(this.map) //the response is a geojson
      this.map.fitBounds(this.plotMap.getBounds()); //Bounds to geojson
    });
    this.dataService.getRoadData().subscribe(res =>{
      this.roadMap.addData(res)
    })

    this.dataService.getPathData().subscribe(res => {
      this.footpathMap.addData(res)
    })
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
