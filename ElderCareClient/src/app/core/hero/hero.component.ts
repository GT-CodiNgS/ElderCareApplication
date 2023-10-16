import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../modules/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  navSate = true;
  loading = false;
  loginUser: boolean = false;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public router: Router,
    public localStorage: LocalStorageService
  ) {
    console.log(this.router.url == '/url');
  }

  ngOnInit(): void {}

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
}
