import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './core/services/http-loader-factory.service';

const routes: Routes = [
  { path: '', redirectTo: '/hero', pathMatch: 'full' },
  {
    path: 'hero',
    loadChildren: () =>
      import('./core/hero/hero.module').then((m) => m.HeroModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
