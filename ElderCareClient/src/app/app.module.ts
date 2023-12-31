import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AlertAndErrorInterceptor } from './core/interceptors/alert-and-error.interceptor';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ConfirmDialogComponent } from './core/dialog/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { UserConfirmDialogComponent } from './core/dialog/user/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    UserConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatTabsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AlertAndErrorInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
