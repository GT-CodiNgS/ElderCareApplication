import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [HomeComponent],
  imports: [NgxPaginationModule],
  exports: [],
  providers: [],
})
export class MainModule {}
