import {Component, inject, OnInit} from '@angular/core';
import { Post, PostGenderType } from 'src/app/core/models/Post';
import { PostService } from 'src/app/core/services/post.service';
import {AddPostComponent} from "../../../add-post/add-post.component";
import {MatDialog} from "@angular/material/dialog";
import {ViewPostComponent} from "./inner-components/view-post/view-post.component";

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  itemsPerPage = 5;
  currentPage = 1;

  posts: Post[] = []

  carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
  };

  postService = inject(PostService);

  constructor(public dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  viewPost(post:Post) {
    let dialogRef = this.dialog.open(ViewPostComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'model-preview',
      hasBackdrop: true,
      data:post
    });
  }
}
