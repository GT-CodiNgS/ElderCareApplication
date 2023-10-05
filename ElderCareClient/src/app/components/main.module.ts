import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MainRoutingModule } from './main.routing';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent } from './main.component';
import { AnimationComponent } from './shared/animation/animation.component';
import { Material } from 'three';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    AnimationComponent,
  ],
  imports: [
    NgxPaginationModule,
    ReactiveFormsModule,
    MatTabsModule,
    FormsModule,
    CommonModule,
    DatePipe,
    RouterModule.forChild(MainRoutingModule),
  ],
  exports: [],
  providers: [],
})
export class MainModule {}
