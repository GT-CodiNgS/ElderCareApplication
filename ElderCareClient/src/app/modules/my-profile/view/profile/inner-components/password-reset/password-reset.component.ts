import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../../../../../../core/services/user.service";
import {PasswordReset} from "../../../../../../core/models/PasswordReset";
import {LocalStorageService} from "../../../../../../core/services/local-storage.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit{


  apiLoading:boolean=false

  detailsForm!: FormGroup;
  userDetail = new PasswordReset(
    '',
    '',
    '',
  );

  constructor(private fb: FormBuilder,
              private userService:UserService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }
    )
  }

  updateProfile() {
    this.apiLoading = true
    if (this.detailsForm.valid){
      this.userService.resetPassword(new PasswordReset(
        this.localStorageService.getItem('id'),
        this.detailsForm.get('password')?.value,
        this.detailsForm.get('confirmPassword')?.value
      )).subscribe( res => {
        console.log(res)
        if (res.code == 204){
          this.localStorageService.setItem('token', res.data.roken)
          this.localStorageService.setItem('id', res.data.userId)
          this.localStorageService.setItem('username', res.data.username)
          this.apiLoading = false
        }
      })
    }else {
      this.detailsForm.markAsTouched()
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.detailsForm.controls[controlName]?.hasError(errorName) && this.detailsForm.controls[controlName]?.touched;
  }
}

