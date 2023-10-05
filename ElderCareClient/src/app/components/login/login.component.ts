import { Component, OnInit, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  loginForm: FormGroup;
  signupForm: FormGroup;
  hidePassword: boolean = true; // Initially hide the password

  isSignInForm: boolean = true;

  ngOnInit(): void {}

  constructor(
    private inputFormBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    private inputForm: FormBuilder
  ) {
    this.loginForm = this.inputForm.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.inputForm.group({
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
}
