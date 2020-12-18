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
  ///

  getPlotData(){
    return this.http
    .get<any>(`${this.API_URL}/plots`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
  updatePlot(plotDetails){
    return this.http
    .post<any>(`${this.API_URL}/updateplot`, plotDetails, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
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


  

  getDzongkhags(){

  }

  getZones(){
    
  }
  postRegistration(item) {
    return this.http
      .post(`${this.API_URL}/household-details`, item, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  postUpdateHouseHold(item, houseHoldId) {
    return this.http
      .put(`${this.API_URL}/household-details/${houseHoldId}`, item, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  postUnit(item){
    return this.http
      .post<any>(`${this.API_URL}/createunit`,item,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  postResident(item){
    return this.http
      .post<any>(`${this.API_URL}/create-resident`,item,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  postCompelte(strid){
    return this.http
      .get<any>(`${this.API_URL}/markcomplete/${strid}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  postShop(item){
    return this.http
      .post<any>(`${this.API_URL}/create-shop`,item,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  postBuilding(item){
    return this.http
      .post<any>(`${this.API_URL}/createbuilding`,item,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  uploadImg(item){
    return this.http
      .post<any>(`${this.API_URL}/upload-img`,item,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
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
