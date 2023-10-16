import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { PostComponent } from './view/post/post.component';
import { UserComponent } from './view/user/user.component';


@NgModule({
  declarations: [
    AdminPanelComponent,
    PostComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule
  ]
})
export class AdminPanelModule { }
