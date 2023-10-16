import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import {ProfileComponent} from "./view/profile/profile.component";
import {MatRadioModule} from '@angular/material/radio';
import {EditProfileComponent} from "./view/edit-profile/edit-profile.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { PasswordResetComponent } from './view/profile/inner-components/password-reset/password-reset.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    MyProfileComponent,
    ProfileComponent,
    EditProfileComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MyProfileModule { }
