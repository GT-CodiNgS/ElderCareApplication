import { Component } from '@angular/core';
import {LoginComponent} from "../../modules/login/login.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  navSate = true;

  loading = false;
  constructor(public dialog: MatDialog) {}

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

  receiveNavState($event: boolean): void{
    console.log("lhsafd");

    this.loading = true
    this.navSate = $event;
  }
}
