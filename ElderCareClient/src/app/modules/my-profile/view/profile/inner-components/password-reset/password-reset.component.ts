import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../../../core/services/user.service';
import { PasswordReset } from '../../../../../../core/models/PasswordReset';
import { LocalStorageService } from '../../../../../../core/services/local-storage.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  apiLoading: boolean = false;

  detailsForm!: FormGroup;
  userDetail = new PasswordReset('', '', '');

  constructor(
    private snackbarService: SnackbarService,
    private fb: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private dialogRef: MatDialogRef<PasswordResetComponent>
  ) {}

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  updatePassword() {
    this.apiLoading = true;
    if (this.detailsForm.valid) {
      this.userService
        .resetPassword(
          new PasswordReset(
            this.localStorageService.getItem('id'),
            this.detailsForm.get('password')?.value,
            this.detailsForm.get('confirmPassword')?.value
          )
        )
        .subscribe((res) => {
          if (res) {
            this.apiLoading = false;
            this.dialogRef.close();
            this.snackbarService.openCustomSnackBar(
              'Update Successfull',
              'error',
              'warn'
            );
          } else {
            this.apiLoading = false;
            this.snackbarService.openCustomSnackBar(
              'Password Update Failed.Please try again',
              'error',
              'warn'
            );
          }
        });
    } else {
      this.detailsForm.markAsTouched();
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return (
      this.detailsForm.controls[controlName]?.hasError(errorName) &&
      this.detailsForm.controls[controlName]?.touched
    );
  };
}
