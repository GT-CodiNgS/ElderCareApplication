import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../core/guards/auth.guard';
import { MainComponent } from './main.component';
import { ProfileComponent } from '../components/profile/profile.component';

export const MainRoutingModule: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../components/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
    ],
  },
];
