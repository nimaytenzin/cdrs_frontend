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

  authenticateUser(uid, pass) {
    const user = {
      user: uid,
      password: pass
    };

    return this.http
      .post<any>(`${this.API_URL}/login`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  //getbuildings
  getBuildingsShape(lap_id){
    return this.http
    .get<any>(`${this.API_URL}/shapefile/get-buildings/${lap_id}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  getSpecificBuildingDetails(id){
    return this.http
    .get<any>(`${this.API_URL}/buildings/get-building/${id}`, this.httpOptions)
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

getFootpathsByLap(lap_id){
  return this.http
  .get<any>(`${this.API_URL}/shapefile/get-footpaths/${lap_id}`, this.httpOptions)
  .pipe(
    catchError(this.handleError)
  )
}

  getPlotData(){
    return this.http
    .get<any>(`${this.API_URL}/plots`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  // post plot detials
  postPlot(plotDetails){
    return this.http
    .post<any>(`${this.API_URL}/plots/add-plot`, plotDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  updatePlot(lap_id,fid,plotDetails){
    return this.http
    .put<any>(`${this.API_URL}/plots/update-plot/${lap_id}/${fid}`, plotDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  // get updated plot details
  getSpecificPlotDetails(lap_id,fid){
    return this.http
    .get<any>(`${this.API_URL}/plots/get-plot/${lap_id}/${fid}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }




  getRoadData(){
    return this.http
    .get<any>(`${this.API_URL}/roads`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  updateRoad(roadDetails){
    return this.http
    .post<any>(`${this.API_URL}/updateroad`, roadDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  getPathData(){
    return this.http
    .get<any>(`${this.API_URL}/footpaths`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
  
  updatePath(footpathDetails){
    return this.http
    .post<any>(`${this.API_URL}/updatepath`, footpathDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateBuilding(buildingDetails){
    return this.http
    .post<any>(`${this.API_URL}/updateBuilding`, buildingDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  shapefileSetDone(lap_id,gid){
    return this.http
    .put<any>(`${this.API_URL}/shapefile/set-done/${lap_id}/${gid}'`,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  

   
  
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

  postCompletion(buildingId) {
    return this.http
      .post(`${this.API_URL}/mark-building-completed/${buildingId}`, '', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  postAtm(items){
    return this.http
      .post(`${this.API_URL}/create-bulk-atm`,items,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  postNewBuilding(item) {
    return this.http
      .post<any>(`${this.API_URL}/buildings`, item, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  postQRScan(item) {
    return this.http
      .post<any>(`${this.API_URL}/scan`, item, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
