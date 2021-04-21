import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


  //getbuildings
  getBuildingsShape(lap_id){
    return this.http
    .get<any>(`${this.API_URL}/shapefile/get-buildings/${lap_id}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }



  getThromdes(){
    return this.http
    .get<any>(`${this.API_URL}/get-thromdes`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
  getLapsByThromdes(thromde_id){
    return this.http
    .get<any>(`${this.API_URL}/get-laps/${thromde_id}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }




//renderShapefile
getPlotsByLap(lap_id){
  return this.http
  .get<any>(`${this.API_URL}/shapefile/get-plots/${lap_id}`, this.httpOptions)
  .pipe(
    catchError(this.handleError)
  )
}

getRoadsByLap(lap_id){
  return this.http
  .get<any>(`${this.API_URL}/shapefile/get-roads/${lap_id}`, this.httpOptions)
  .pipe(
    catchError(this.handleError)
  )
}

getPrecicntColor(precicnt){
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

getFootpathsByLap(lap_id){
  return this.http
  .get<any>(`${this.API_URL}/shapefile/get-footpaths/${lap_id}`, this.httpOptions)
  .pipe(
    catchError(this.handleError)
  )
}
/** *************POINT FEATURE DATA SERVICS********************* */
getPointFeaturesByLap(lap_id){
  return this.http
  .get<any>(`${this.API_URL}/points/get-all/${lap_id}`)
  .pipe(
    catchError(this.handleError)
  )
}
addPointFeature(featureDetails){
  return this.http
  .post<any>(`${this.API_URL}/points/add-point`, featureDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}
getSpecificPoint(id){
  return this.http
  .get<any>(`${this.API_URL}/points/get-point/${id}`)
  .pipe(
    catchError(this.handleError)
  )
} 

updatePoint(id,featureDetails){
  return this.http
  .put<any>(`${this.API_URL}/points/update-point/${id}`, featureDetails, this.httpOptions)
  .pipe(
    catchError(this.handleError)
  );
}


/** *************PLOT DATA SERVICS********************* */
  postPlot(plotDetails){
    return this.http
    .post<any>(`${this.API_URL}/plots/add-plot`, plotDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  updatePlot(fid,plotDetails){
    return this.http
    .put<any>(`${this.API_URL}/plots/update-plot/${fid}`, plotDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  getSpecificPlotDetails(fid){
    return this.http
    .get<any>(`${this.API_URL}/plots/get-plot/${fid}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
  setPlotDone(fid){
    return this.http
    .put<any>(`${this.API_URL}/plots/set-done/${fid}`,  this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }


  /********************* ROAD DATA API ************************* */

  postRoad(roadDetails){
    return this.http
    .post<any>(`${this.API_URL}/roads/add-road`, roadDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  updateRoad(roadDetails, fid){
    return this.http
    .put<any>(`${this.API_URL}/roads/update-road/${fid}`, roadDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  getSpecificRoadData(fid){
    return this.http
    .get<any>(`${this.API_URL}/roads/get-road/${fid}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  setRoadDone(object_id){
    return this.http
    .put<any>(`${this.API_URL}/roads/set-done/${object_id}`,  this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

/************************************ FOOTPATH API ***************************************************************** */

  postFootpath(footpathDetails){
    return this.http
    .post<any>(`${this.API_URL}/footpaths/add-path`, footpathDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  updateFootpath(fid,footpathDetails){
    return this.http
    .put<any>(`${this.API_URL}/footpaths/update-path/${fid}`, footpathDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  getSpecificFootpath(fid){
    return this.http
    .get<any>(`${this.API_URL}/footpaths/get-path/${fid}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  footpathSetDone(fid){
    return this.http
    .put<any>(`${this.API_URL}/footpaths/set-done/${fid}'`,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }


  /******************************* BUILDING DATA API ************************************************* */
  getSpecificBuildingDetails(id){
    return this.http
    .get<any>(`${this.API_URL}/buildings/get-building/${id}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  updateBuilding(buildingDetails,building_id){
    return this.http
    .put<any>(`${this.API_URL}/buildings/update-building/${building_id}`, buildingDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  buildingSetDone(building_id){
    return this.http
    .put<any>(`${this.API_URL}/buildings/set-done/${building_id}'`,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }


  /********************************** IMAGE SERVICE API************************************************* */
 
  uploadImg(item){
    return this.http
      .post<any>(`${this.API_URL}/images/add-image`,item,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getImages(fid,ftype){
    return this.http
    .get<any>(`${this.API_URL}/images/get-image/${ftype}/${fid}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  /********************************** Chart SERVICE API************************************************* */
  getPrecinctStats(lap_id){
    return this.http
    .get<any>(`${this.API_URL}/charts/precinct_stats/${lap_id}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }


}
