import { Post } from './../../models/Post';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../../services/post.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  postId: any;
  constructor(
    private snackbarService: SnackbarService,
    private postService: PostService,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.postId = data.post.id;
  }

  bntYes() {
    console.log(this.postId);
    if (!this.postId) {
      this.snackbarService.openCustomSnackBar('Post not found!', 'error');
      return;
    }
    this.postService.deletePost(this.postId).subscribe((res) => {
      console.log(res);
      this.snackbarService.openCustomSnackBar(
        'Post deleted successfully!',
        'success'
      );
      this.dialogRef.close(true);
    });
  }

  btnClose() {
    this.dialogRef.close(false);
  }
}
