import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero.component';
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [{ path: '', component: HeroComponent, children:
    [
      { path: '', loadChildren: () => import('../../modules/home/home.module').then(m => m.HomeModule) },
      { path: 'my-profile', loadChildren: () => import('../../modules/my-profile/my-profile.module').then(m => m.MyProfileModule), canActivateChild: [AuthGuard] },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRoutingModule { }
