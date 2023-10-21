import { Post } from './../../models/Post';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../../services/post.service';
import { SnackbarService } from '../../services/snackbar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class UserConfirmDialogComponent {
  userId: any;
  constructor(
    private snackbarService: SnackbarService,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = data.user.id;
    console.log(data.user.id);
  }

  bntYes() {
    if (!this.userId) {
      this.snackbarService.openCustomSnackBar('User not found!', 'error');
      return;
    }
    this.userService.removeUser(this.userId).subscribe((res) => {
      console.log(res);
      this.snackbarService.openCustomSnackBar(
        'User deleted successfully!',
        'success'
      );
      this.dialogRef.close(true);
    });
  }

  btnClose() {
    this.dialogRef.close(false);
  }
}
