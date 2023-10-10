import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import * as jwt from 'jsonwebtoken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  isSignInForm: boolean = true;
  disableLoginBtn = false;
  userData: any;

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
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  toggleForm() {
    this.isSignInForm = !this.isSignInForm;
  }

  signIn() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.disableLoginBtn = true;
          this.userData = response;
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
}
