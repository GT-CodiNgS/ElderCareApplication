import { Component, inject } from '@angular/core';
import { Post } from 'src/app/core/models/Post';
import { PostService } from 'src/app/core/services/post.service';
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {AddPostComponent} from "../add-post/add-post.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  constructor(public dialog: MatDialog) {}

  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, USA',
  };

  itemsPerPage = 5;
  currentPage = 1;
  posts: Post[] = [];

  carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
  };

  postService = inject(PostService);

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  openAddPostDialog(): void {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '500px',
      height: 'auto',
      panelClass: 'model-preview',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditProfileDialog() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '500px',
      height: 'auto',
      panelClass: 'model-preview',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
