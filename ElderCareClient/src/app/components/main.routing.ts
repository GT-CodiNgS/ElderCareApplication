import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../core/guards/auth.guard';
import { MainComponent } from './main.component';

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
        path: 'about',
        loadChildren: () =>
          import('../components/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
    ],
  },
];
