import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { AuthenticationService } from '../service/authentication.service';

interface Zone {
  id: string;
  name: string;
  thromde:string
}

interface Laps {
  id: string;
  lap_name: string;
}

interface Thromde {
  id: string;
  name: string;
  createdAt: string;
  updatedAt:string;
}

@Component({
  selector: 'app-select-zone',
  templateUrl: './select-zone.component.html',
  styleUrls: ['./select-zone.component.scss']
})
export class SelectZoneComponent implements OnInit {

  lapForm: FormGroup;
  thromdes: Thromde[] = [];
  laps: Laps[] = [];
  
  isUserLoggedIn: boolean;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    
    this.dataService.getThromdes().subscribe(res => {
      this.thromdes = res
    })

    this.reactiveForm();
  }


  reactiveForm() {
    this.lapForm = this.fb.group({
      thromdeControl: [],
      lapControl: []
    });
  }

  getLaps(e){
    console.log(e.value)
    this.dataService.getLapsByThromdes(e.value).subscribe(res => {
      this.laps = res
    })
  }

  redirectToDashboard() {
    if (this.lapForm.valid) {
      sessionStorage.setItem('thromde_id', this.lapForm.get('thromdeControl').value);
      sessionStorage.setItem('lap_id', this.lapForm.get('lapControl').value);
      this.router.navigate(['mapview']);
    }
  }
}
