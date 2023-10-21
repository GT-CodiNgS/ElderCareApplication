import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/core/dialog/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UserService } from 'src/app/core/services/user.service';
import { UserProfile } from 'src/app/core/models/UserProfile';
import { UserConfirmDialogComponent } from 'src/app/core/dialog/user/confirm-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  displayedColumns: string[] = [
    'actions',
    'title',
    'createdby',
    'createdDate',
    'userName',
    'city',
    'verified',
    'emailSent',
    'delete',
  ];
  dataSource = new MatTableDataSource<UserProfile>();
  users: UserProfile[] = [];
  filteredUsers: UserProfile[] = [];

  searchQuery: string = '';
  UserService = inject(UserService);
  userService = inject(UserService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
      this.dataSource.data = this.filteredUsers;
    });
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getGenderText(gender: number): string {
    switch (gender) {
      case 0:
        return 'Male';
      case 1:
        return 'Female';
      case 2:
        return 'Unisex';
      default:
        return 'Unknown';
    }
  }

  searchUsers(query: string): void {
    query = query.trim();
    if (!query) {
      this.filteredUsers = [...this.users];
      this.dataSource.data = this.filteredUsers;
      return;
    }

    // this.filteredUsers = this.users.filter((user) =>
    //   user.Username.toLowerCase().includes(query.toLowerCase())
    // );
    this.dataSource.data = this.filteredUsers;
  }

  deleteRow(row: any) {
    console.log('Delete clicked for:', row);
    this.delete(row);
  }

  delete(User: UserProfile) {
    let matDialogRef = this.dialog.open(UserConfirmDialogComponent, {
      data: { user: User, title: 'Delete Confirm', message: 'Are you sure?' },
    });
    matDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAllUsers();
      }
    });
  }

  resetPassword(row: any) {
    this.UserService.resetPassword(row.email).subscribe((res) => {
      this.snackbarService.openCustomSnackBar(
        'Password reset link sent successfully!',
        'success'
      );
    });
  }
}
