import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../modules/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { Observable, delay, of, switchMap } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  navSate = true;
  loading = false;
  loginUser: boolean = false;
  isLoading$!: Observable<boolean>;
  selectedLanguage!: string;
  currentLanguage!: string;
  isPostActive: boolean = true;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public router: Router,
    public localStorage: LocalStorageService,
    private loadingService: LoadingService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
    this.isLoading$ = this.loadingService.loading$;
    this.selectedLanguage = localStorage.getLangItem('language') || 'en';
    this.translate.use(this.selectedLanguage);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(this.activatedRoute.firstChild?.snapshot.url[0]?.path);

        this.isPostActive =
          this.activatedRoute.firstChild?.snapshot.url[0]?.path !== 'user';

        this.cdRef.detectChanges();
      }
    });
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });
    this.currentLanguage = this.translate.currentLang || 'en';
  }

  changeLanguage() {
    this.currentLanguage = this.selectedLanguage;
    this.translate.use(this.selectedLanguage);
    localStorage.setItem('language', this.selectedLanguage);
    console.log(this.currentLanguage);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      height: 'auto',
      panelClass: 'model-preview',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    this.isLoading$ = this.loadingService.loading$.pipe(
      switchMap((loading) => {
        if (loading) {
          return of(true);
        } else {
          return of(false).pipe(delay(1000));
        }
      })
    );
  }

  receiveNavState($event: boolean): void {
    console.log('lhsafd');

    this.loading = true;
    this.navSate = $event;
  }

  logout() {
    this.localStorage.clear();
    this.router.navigate([''], { relativeTo: this.route });
  }

  navigateToProfile() {
    let token = this.localStorage.getItem('token');
    if (token) {
      this.router.navigate(['my-profile'], { relativeTo: this.route });
    } else {
      this.dialog.open(LoginComponent);
    }
  }

  navigateToAdminPanel() {}
}
