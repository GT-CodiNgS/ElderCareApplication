import { AuthService } from '../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import {LocalStorageService} from "../../core/services/local-storage.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  isSignInForm: boolean = true;
  disableLoginBtn = false;
  userData?: any;
  isAdded = false;
  isAddedLogin = false;

  apiLoading:boolean=false

  ngOnInit(): void {}

  constructor(
    private inputFormBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private route: ActivatedRoute,public router: Router,
    private localStorageService:LocalStorageService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.loginForm = this.inputFormBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    this.signupForm = this.inputFormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required]],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  toggleForm() {
    this.isSignInForm = !this.isSignInForm;
  }

  public checkSingInError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName]?.hasError(errorName) && this.loginForm.controls[controlName]?.touched;
  }

  public checkUpError = (controlName: string, errorName: string) => {
    return this.signupForm.controls[controlName]?.hasError(errorName) && this.signupForm.controls[controlName]?.touched;
  }

  async signIn() {
    this.apiLoading = true
    this.isAddedLogin = !this.loginForm.valid;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          setTimeout(function(){
            console.log('lll')
          }, 10000);
          this.disableLoginBtn = true;
          this.userData = response;
          this.snackbarService.openCustomSnackBar(
            'Login Successful',
            'success',
            'primary'
          );

          console.log(this.userData)
          this.apiLoading = false
          this.localStorageService.setItem('token', this.userData.token);
          this.localStorageService.setItem('id', this.userData.id);
          this.localStorageService.setItem('roleType', this.userData.roleType);
          this.dialogRef.close();
          this.router.navigate([ 'my-profile' ], { relativeTo: this.route });
        },
        (error) => {
          this.apiLoading = false
          console.log(error);
          this.snackbarService.openCustomSnackBar(
            'Login Failed',
            'error',
            'warn'
          );
        }
      );
    } else {
      this.snackbarService.openCustomSnackBar(
        'Please fill required fields',
        'error',
        'warn'
      );
    }
  }

  async signUp() {
    this.apiLoading = true
    this.isAdded = !this.signupForm.valid;
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe(
        async (response) => {
          this.disableLoginBtn = true;
          this.userData = response;
          this.localStorageService.setItem('token', this.userData.result.token);
          this.localStorageService.setItem('id', this.userData.result.id);
          this.snackbarService.openCustomSnackBar(
            'Registration Successful',
            'success',
            'primary'
          );
          this.apiLoading = false
          this.closeDialog();
        },

        (error) => {
          this.apiLoading = false
          console.log(error);
          this.snackbarService.openCustomSnackBar(
            'Registration Failed',
            'error',
            'warn'
          );
        }
      );
    } else {
      this.signupForm.markAsTouched()
      this.snackbarService.openCustomSnackBar(
        'Please fill required fields',
        'error',
        'warn'
      );
    }
  }

  setLocalStorage(userData: any) {
    console.log(userData.Id);

    localStorage.setItem('token', userData.Id);

    this.localStorageService.setItem('token', "token");
    console.log(localStorage.getItem('userId'));
  }
}
