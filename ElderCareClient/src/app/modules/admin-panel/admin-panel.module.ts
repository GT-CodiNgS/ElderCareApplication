import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { PostComponent } from './view/post/post.component';
import { UserComponent } from './view/user/user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [AdminPanelComponent, PostComponent, UserComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class AdminPanelModule {}
