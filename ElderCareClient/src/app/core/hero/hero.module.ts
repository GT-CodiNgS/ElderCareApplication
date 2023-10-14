import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroRoutingModule } from './hero-routing.module';
import { HeroComponent } from './hero.component';
import {HomeComponent} from "../../modules/home/home.component";
import {LoginComponent} from "../../modules/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [
    HeroComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HeroRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class HeroModule { }
