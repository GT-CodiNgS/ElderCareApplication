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
        component: HomeComponent,
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
    ],
  },
];
