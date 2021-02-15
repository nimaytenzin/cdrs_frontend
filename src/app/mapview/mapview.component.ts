import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-easybutton';
import 'leaflet-easybutton/src/easy-button.css';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar, MatDialog, MatSidenav } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
  pointFeatureMap: L.GeoJSON;
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
  displayDetails:boolean;
  roadDataExists:boolean;

  d_status:string;
  plot_use:string;
  max_height:string;
  setback_e:string;
  parking:string;
  remarks:string

  segmentId:string;
  length:string;
  developmentStatus:string;
  row:string;
  carriageWay:string;
  lanes:string;
  median:string;
  remarksR:string


  fLenght:string;
  fSegmentId:string;
  fWidth:string;
  fStatus:string;
  fLighting:string;
  fFriendliness:string;
  fRemarks:string;

  isAddAllowed = false;
  newMarker:L.Marker
   googleSatUrl = "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}";
   cartoPositronUrl = "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png";


   myMarker = L.icon({
    iconUrl: 'assets/mymarker.png',
    iconSize: [20, 20]
  });
  
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
    this.displayDetails = false
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

  toggleAdd() {
    this.snackBar.open('Tap on the structure/building you want to add', '', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['info-snackbar']
    });
 
  }


  renderFeatures(){
    var cartoMap = L.tileLayer(this.cartoPositronUrl);
    var satelliteMap = L.tileLayer(this.googleSatUrl);

    this.map = L.map('map',{
      layers: [cartoMap],
      renderer: L.canvas({ tolerance: 3 })
    }).setView([ 27.4712,89.64191,], 13);
    
      var baseMaps = {
      "Satellite": satelliteMap,
      "Carto Map" : cartoMap
    };

    L.easyButton('<img src="../assets/plus.png">', (btn, map) =>{
      this.snackBar.open('Tap on map to add', '', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['info-snackbar']
      });
      this.isAddAllowed = true;}).addTo(this.map);
   
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
          fillColor : getColor(feature),
          color : getColor(feature),
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

    this.pointFeatureMap = L.geoJSON(null, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius : 4,
          fillColor : "rgb(33,150,243)",
          color :"rgb(33,150,243)",
          weight : 1,
          opacity : 1,
          fillOpacity : 1
      });
    },
    onEachFeature:  (feature, layer) => {
      layer.on('click',(e) => {
        sessionStorage.setItem('fid', feature.properties.id)
        this.router.navigate(['updatefeature'])
      });
    }
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
          this.dataService.getSpecificPlotDetails(feature.properties.gid).subscribe(res => {
           if(res.data.length !== 0){
             this.editDisabled = true
             this.displayDetails = true
            this.d_status = res.data[0].d_status;
            this.plot_use = res.data[0].plot_use;
            this.max_height = res.data[0].max_height;
            this.setback_e = res.data[0].setback_e;
            this.parking = res.data[0].parking;
            this.d_status = res.data[0].d_status;
            this.remarks = res.data[0].remarks;
           }else{
            this.displayDetails = false
            this.editDisabled = false
            this.d_status= "not updated";
            this.plot_use="not updated";
            this.max_height="not updated";
            this.setback_e="not updated";
            this.parking="not updated";
            this.remarks="not updated"         
           }     
          })
        
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
    })

    

    
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
          sessionStorage.setItem('fid', feature.properties.object_id)
          this.dataService.getSpecificRoadData(feature.properties.object_id).subscribe(
            res => {
             if(res.length !== 0){
               this.roadDataExists = true;
              this.segmentId = res[0].fid;
              this.length = feature.properties.length + " m";
              this.developmentStatus = res[0].d_status;
              this.row = res[0].row + " m";
              this.carriageWay = res[0].carriage_width + " m";
              this.lanes = res[0].lanes;
              this.median = res[0].median + " m";
              this.remarksR = res[0].remarks
             }else{
               this.roadDataExists = false
              this.segmentId = feature.properties.object_id;
              this.length = feature.properties.length;
              this.developmentStatus = "Not updated";
              this.row ="Not updated" ;
              this.carriageWay = "Not updated";
              this.lanes ="Not updated";
              this.median = "Not updated";
              this.remarksR = "Not updated"
             }
            }
          )
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
          this.fSegmentId = feature.properties.object_id;
          sessionStorage.setItem('fid', feature.properties.object_id)
          this.fLenght = feature.properties.length;
          this.dataService.getSpecificFootpath(this.fSegmentId).subscribe(res => {
            if(res.length !== 0){
              this.fWidth = res[0].width + " m";
              this.fLighting = res[0].lighting;
              this.fStatus = res[0].d_status
              this.fFriendliness = res[0].friendliness
              this.fRemarks = res[0].remarks
            }else{
              this.fWidth = "Not Updated";
              this.fLighting = "Not Updated"
              this.fStatus = "Not Updated";
              this.fFriendliness = "Not Updated";
              this.fRemarks ="Not Updated";
            }
          })
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
      "Footpath": this.footpathMap,
      "Point Features":this.pointFeatureMap
    };        
    this.layers = L.control.layers(baseMaps,overlayMaps).addTo(this.map);
    this.fetchGeojson()

    this.map.on('click', <LeafletMouseEvent>($e) => {
      if (this.isAddAllowed) {
        if (this.newMarker !== undefined) {
          this.map.removeLayer(this.newMarker);
        }
        this.newMarker = L.marker($e.latlng, {icon: this.myMarker}).addTo(this.map)
        sessionStorage.setItem('lat',$e.latlng.lat)
        sessionStorage.setItem('lng', $e.latlng.lng)
        this.presentAlert($e.latlng)
      }
    });
    //preload vs on load
    this.displaySelectively(sessionStorage.getItem('featureEdit'))
  }

  displaySelectively(value){
    switch(value) {
      case "Buildings":
        this.map.addLayer(this.buildingMap)
        break;
      case "Roads":
        this.map.addLayer(this.roadMap)
        break;
      case "Footpaths":
        this.map.addLayer(this.footpathMap)
        break;
      case "Points":
        this.map.addLayer(this.pointFeatureMap)
        break;
      default:
        this.map.addLayer(this.plotMap)
    }


  }


  fetchGeojson() {
    let lap_id = sessionStorage.getItem('lap_id')
    this.dataService.getPointFeaturesByLap(lap_id).subscribe(res => {
      this.pointFeatureMap.addData(res)
    })
    this.dataService.getBuildingsShape(lap_id).subscribe(res => {
      this.buildingMap.addData(res)
    })
    this.dataService.getPlotsByLap(lap_id).subscribe(res =>{
      this.plotMap.addData(res)
      this.map.fitBounds(this.plotMap.getBounds())
    })
    this.dataService.getRoadsByLap(lap_id).subscribe(res => {
      this.roadMap.addData(res)
    })
    this.dataService.getFootpathsByLap(lap_id).subscribe(res => {
      this.footpathMap.addData(res)
    })
    
  }

  goToDash(){
    this.router.navigate(['dashboard'])
  }

  presentAlert(latlng) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: `Add a feature Here at ${latlng.lat}, ${latlng.lng} ?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigate(['updatefeature'])
      }else{
        this.map.removeLayer(this.newMarker)
        this.isAddAllowed = false;
      }
    });
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
