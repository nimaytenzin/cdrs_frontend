import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar, MatDialog, MatSidenav } from '@angular/material';

export class PlotInfo{
  
  plot_id: string;
  precinct: string;
  area:number;
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
  buildingMap:L.GeoJSON;
  roadMap:L.GeoJSON;
  footpathMap:L.GeoJSON;
  map: L.Map;
  layers: L.Control;
  isShowing:boolean;
  displayFootpathCard:boolean;
  displayPlotCard:boolean;
  displayRoadSegmentCard:boolean;
  editDisabled:boolean;
  plotInfo: PlotInfo;
  roadSegmentInfo: RoadSegmentInfo;
  footpathInfo : FootpathInfo;
  displayDetails:boolean = false;


  d_status: string;
  plot_use:string;
  max_height:string;
  setback_e:string;
  parking:string;
  remarks:string

   googleSatUrl = "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}";
   hybridMapUrl = "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}";
   cartoPositronUrl = "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png";
   osmBaseUrl = "https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png";

  
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

  geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
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

  getplotDetails(){
   
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


    
    function getColor(feature){
      if(feature.properties.done === "true"){
        return "red"
      }else{
        return "green"
      }
    }
    this.buildingMap = L.geoJSON(null, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius : 4,
          fillColor : "red",
          color : "red",
          weight : 1,
          opacity : 1,
          fillOpacity : 1
      });
    },
    onEachFeature:  (feature, layer) => {
      layer.on('click',(e) => {
       sessionStorage.setItem('building_id', feature.properties.structure_)
       this.router.navigate(['updatebuilding'])
      });
    }, 
    }) 
   
 
    this.plotMap= L.geoJSON(null,{
      style: function (feature) {
        return {
            fillColor: getColor(feature),
            weight: 0.5,
            opacity: 1,
            color: "black",
            fillOpacity: .5
        };
      },
      onEachFeature:  (feature, layer) => {  
        layer.on('click',(e) => {          
          if(feature.properties.done === "true"){
            this.editDisabled = true 
            this.displayDetails = true     
            this.dataService.getSpecificPlotDetails(feature.properties.lap_id, feature.properties.gid).subscribe(res => {
              this.d_status = res.data[0].d_status;
              this.plot_use = res.data[0].plot_use;
              this.max_height = res.data[0].max_height;
              this.setback_e = res.data[0].setback_e;
              this.parking = res.data[0].parking;
              this.d_status = res.data[0].d_status;
              this.remarks = res.data[0].remarks;
            })

          }else{
            this.editDisabled = false
            this.displayDetails = false
          }
          sessionStorage.setItem('fid', feature.properties.gid);
          sessionStorage.setItem('plot_id', feature.properties.plot_id)
          sessionStorage.setItem('precinct', feature.properties.precinct)
          sessionStorage.setItem('area', feature.properties.area )
          sessionStorage.setItem('height', feature.properties.height)
          sessionStorage.setItem('coverage', feature.properties.coverage)
          sessionStorage.setItem('setback', feature.properties.setback)

          this.displayFootpathCard = false;
          this.displayPlotCard = true;
          this.displayRoadSegmentCard = false;
          this.plotInfo.plot_id = feature.properties.plot_id;
          this.plotInfo.precinct = feature.properties.precinct;
          this.plotInfo.area = feature.properties.area_m2;
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
      }
        
    }).addTo(this.map)

    this.roadMap = L.geoJSON(null, {

      style: function (feature) {
        return {
            color: getColor(feature),
            weight: 2,
            opacity: 1,
            fillOpacity: 1
        };
      },
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
      },}) 

    this.footpathMap = L.geoJSON(null, {
      style: function (feature) {
        return {
            weight: 2,
            opacity: 1,
            color:  getColor(feature),
            dashArray: "4 4 4 4",
        };
      },
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
    }) 

        var overlayMaps = {
          "Plots": this.plotMap,
          "Buildings":this.buildingMap,
          "Roads": this.roadMap,
          "Footpath": this.footpathMap
        };
        
        this.layers = L.control.layers(baseMaps,overlayMaps).addTo(this.map);


        this.fetchGeojson()
  }

  fetchGeojson() {
    let lap_id = sessionStorage.getItem('lap_id')
    this.dataService.getBuildingsShape(lap_id).subscribe(res => {
      this.buildingMap.addData(res)
    })
    this.dataService.getPlotsByLap(lap_id).subscribe(res =>{
      console.log("plots",res)
      this.plotMap.addData(res)
      this.map.fitBounds(this.plotMap.getBounds())
    })
    this.dataService.getRoadsByLap(lap_id).subscribe(res => {
      console.log("roads",res)
      this.roadMap.addData(res)
    })
    this.dataService.getFootpathsByLap(lap_id).subscribe(res => {
      console.log("footpath",res)
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
