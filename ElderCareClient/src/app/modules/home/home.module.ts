import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './view/home/dashboard.component';
import { ViewPostComponent } from './view/home/inner-components/view-post/view-post.component';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardComponent, ViewPostComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatRadioModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class HomeModule {}
