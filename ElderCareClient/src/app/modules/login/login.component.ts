import { AuthService } from '../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

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

  ngOnInit(): void {}

  constructor(
    private inputFormBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private authService: AuthService,
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

  async signIn() {
    this.isAddedLogin = !this.loginForm.valid;
    if (this.loginForm.valid) {
      await this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.disableLoginBtn = true;
          this.userData = response;
          this.setLocalStorage(response);
          this.snackbarService.openCustomSnackBar(
            'Login Successful',
            'success',
            'primary'
          );
          this.closeDialog();
        },
        (error) => {
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
    this.isAdded = !this.signupForm.valid;
    if (this.signupForm.valid) {
      await this.authService.register(this.signupForm.value).subscribe(
        async (response) => {
          this.disableLoginBtn = true;
          this.userData = response;
          this.setLocalStorage(response);
          this.snackbarService.openCustomSnackBar(
            'Registration Successful',
            'success',
            'primary'
          );
          this.closeDialog();
        },

        (error) => {
          console.log(error);
          this.snackbarService.openCustomSnackBar(
            'Registration Failed',
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

  setLocalStorage(userData: any) {
    console.log(userData.Id);

    localStorage.setItem('userId', userData.Id);
    console.log(localStorage.getItem('userId'));
  }
}
