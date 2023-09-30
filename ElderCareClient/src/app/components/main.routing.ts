import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const MainRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: HomeComponent,
  },
  {
    path: 'contact',
    component: HomeComponent,
  },
];
