import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile.component';
import { EditProfileComponent } from './view/edit-profile/edit-profile.component';
import { ProfileComponent } from './view/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: MyProfileComponent,
    children: [{ path: '', component: ProfileComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfileRoutingModule {}
