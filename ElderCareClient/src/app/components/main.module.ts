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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './profile/profile.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    AnimationComponent,
    ProfileComponent,
    AddPostComponent,
    EditProfileComponent,
  ],
  imports: [
    NgxPaginationModule,
    ReactiveFormsModule,
    MatTabsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    DatePipe,
    RouterModule.forChild(MainRoutingModule),
  ],
  exports: [],
  providers: [],
})
export class MainModule {}
