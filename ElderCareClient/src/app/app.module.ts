import { MatIconModule } from '@angular/material/icon';
import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './core/guards/auth.guard';
import { AppRoutingModule } from './app.routing';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SettingsService } from './settings.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    RouterModule.forRoot(AppRoutingModule),
  ],
  providers: [
    AuthGuard,
    AppComponent,
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const settingsService = inject(SettingsService);
        const http = inject(HttpClient);
        return () =>
          new Promise((resolve) => {
            if (environment.production) {
              http
                .get('./config.json')
                .pipe(
                  tap((data: any) => {
                    settingsService.baseUrl = data.baseUrl;
                    resolve(true);
                  }),
                  catchError((error) => {
                    settingsService.baseUrl = 'http://default.api';
                    resolve(true);
                    return of(null);
                  })
                )
                .subscribe();
            } else {
              // load settings for a local app
              const settings = require('../../config.json');
              settingsService.baseUrl = settings.baseUrl;
              resolve(true);
            }
          });
      },
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  // exports: [RouterModule],
})
export class AppModule {}
