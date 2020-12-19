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

interface Subzone {
  id: string;
  name: string;
  zone_id: number;
}

interface Thromde {
  id: string;
  name: string;
}

@Component({
  selector: 'app-select-zone',
  templateUrl: './select-zone.component.html',
  styleUrls: ['./select-zone.component.scss']
})
export class SelectZoneComponent implements OnInit {

  zoneForm: FormGroup;
  thromdes: Thromde[] = [
    {id: "1", name: "Thimphu Thromde"},
    {id: "2", name: "Phuntsholing Thromde"},
    {id: "3", name: "Gelephu Thromde"},
    {id: "4", name: "SamdrupJongkhar Thromde"},
  ];
  zones: Zone[] = [
    {id: "1", name: "North Thimphu", thromde:"Thimphu Thromde"},
    {id: "2", name: "South Thimphu", thromde:"Thimphu Thromde"},
  ];
  plans: Subzone[] = [
    {id: "1", name: "Simtokha LAP", zone_id:1},
    {id: "1", name: "Dechencholing LAP", zone_id:2},
  ];
  

  isUserLoggedIn: boolean;

  dzongkhag: string;
  zone: string;
  subZone: string;
  shop: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe(value => {
      this.isUserLoggedIn = value;
    });

    this.reactiveForm();
    // this.getDzongkhagList();

    const dzongkhagId = sessionStorage.getItem('dzongkhagId');
    const zoneId = sessionStorage.getItem('zoneId');
    const subZoneId = sessionStorage.getItem('subZoneId');
    const shopId = sessionStorage.getItem('shopId');
    // this.getZoneList(dzongkhagId);
    // this.getSubzoneList(zoneId);
    this.dzongkhag = dzongkhagId;
    this.zone = zoneId;
    this.subZone = subZoneId;
    this.shop = shopId;
  }

  reactiveForm() {
    this.zoneForm = this.fb.group({
      zoneControl: ['', Validators.compose([Validators.required])],
      subZoneControl: ['', Validators.compose([Validators.required])],
      shopControl: ['', Validators.compose([])],
      dzongkhagControl: ['', Validators.compose([Validators.required])]
    });
  }

  // getDzongkhagList() {
  //   this.dataService.getDzongkhags().subscribe(response => {
  //     this.dzongkhags = response.data;
  //   });
  // }

  // getZoneList(dzongkhagId) {
  //   this.dataService.getZones(dzongkhagId).subscribe(response => {
  //     this.zones = response.data;
  //   });
  // }

  // getSubzoneList(zoneId) {
  //   this.dataService.getSubZones(zoneId).subscribe(response => {
  //     this.subZones = response.data;
  //   });
  // }

  redirectToDashboard() {
    if (this.zoneForm.valid) {
      sessionStorage.setItem('dzongkhagId', this.zoneForm.get('dzongkhagControl').value);
      sessionStorage.setItem('zoneId', this.zoneForm.get('zoneControl').value);
      sessionStorage.setItem('subZoneId', this.zoneForm.get('subZoneControl').value);
      sessionStorage.setItem('shopId', this.zoneForm.get('shopControl').value);
      this.router.navigate(['mapview']);
    }
  }
}
