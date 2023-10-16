import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserUpdate} from "../../../../core/models/UserUpdate";
import {UserService} from "../../../../core/services/user.service";
import {WindowRef} from "ngx-owl-carousel-o/lib/services/window-ref.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  detailsForm!: FormGroup;
  userDetail = new UserUpdate(
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  );

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private fb: FormBuilder,
              private userService:UserService,) {
    this.userDetail = data
  }

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        username: ['', Validators.required],
      }
    )

    this.setUserDetails();
  }

  setUserDetails() {
    console.log(this.userDetail)
    this.detailsForm.get('firstName')?.setValue(this.userDetail.firstName)
    this.detailsForm.get('lastName')?.setValue(this.userDetail.lastName)
    this.detailsForm.get('email')?.setValue(this.userDetail.email)
    this.detailsForm.get('phone')?.setValue(this.userDetail.phone)
    this.detailsForm.get('address')?.setValue(this.userDetail.address)
    this.detailsForm.get('city')?.setValue(this.userDetail.city)
    this.detailsForm.get('username')?.setValue(this.userDetail.username)
  }

  updateProfile() {
    if (this.detailsForm.valid){
      this.userService.updateUser(this.userDetail).subscribe(res => {
        if (res.code == 204){
          window.location.reload();
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
