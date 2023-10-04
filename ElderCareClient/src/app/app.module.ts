import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './core/guards/auth.guard';
import { AppRoutingModule } from './app.routing';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutingModule),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  // exports: [RouterModule],
})
export class AppModule {}
