import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.reactiveForm();
  }

  
  reactiveForm() {
    this.loginForm = this.fb.group({
      userName: [],
      password: []
    });
    this.loginForm.controls.userName.setValue(localStorage.getItem('loginId'));
  }

  login() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const loginId = this.loginForm.get('userName').value;
      const password = this.loginForm.get('password').value;
     
      if(loginId === "cdrs" && password === "cdrs@2021"){
        this.router.navigate(['selectzone']);
        this.snackBar.open('Welcome to CDRS', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
      }else if(loginId === "admin" && password === "cdrs@2021" ){
        this.router.navigate(['admin']);
        this.snackBar.open('Welcome to CDRS', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
      }else{
        this.snackBar.open('Invalid login credentials, please try again', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    }
  
  }
}
