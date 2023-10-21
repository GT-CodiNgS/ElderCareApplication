import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../core/services/post.service';
import { Post, PostGenderType } from '../../core/models/Post';
import { SnackbarService } from '../../core/services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  detailsForm!: FormGroup;

  selectedPost: Post = new Post(
    '',
    '',
    '',
    PostGenderType.Male,
    '',
    false,
    new Date(),
    new Date(),
    '',
    '',
    false
  );

  title: string = 'Create a Post';

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private localStorageService: LocalStorageService,
    private dialogRef: MatDialogRef<AddPostComponent>,
    private snackbarService: SnackbarService,
    private postService: PostService
  ) {
    if (data) {
      this.selectedPost = data;
      this.title = 'Update Post';
      this.setData();
    }
  }

  addPost() {}

  setData() {
    console.log(this.selectedPost);
  }

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      postGenderType: ['', Validators.required],
      body: ['', [Validators.required]],
    });
  }

  createPost() {
    if (this.detailsForm.valid) {
      this.postService
        .addPost(
          new Post(
            '',
            this.detailsForm.get('title')?.value,
            this.detailsForm.get('description')?.value,
            this.detailsForm.get('postGenderType')?.value,
            this.detailsForm.get('body')?.value,
            false,
            new Date(),
            new Date(),
            this.localStorageService.getItem('id'),
            this.localStorageService.getItem('id'),
            false
          )
        )
        .subscribe((res) => {
          this.dialogRef.close();
        });
    } else {
      this.snackbarService.openCustomSnackBar(
        'Please fill required fields',
        'error',
        'warn'
      );
      this.detailsForm.markAsTouched();
    }
  }
}
