import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const AppRoutingModule: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/main.module').then((m) => m.MainModule),
  },
];
