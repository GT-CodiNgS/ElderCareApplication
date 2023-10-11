import { Component, inject, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/Post';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
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
}
