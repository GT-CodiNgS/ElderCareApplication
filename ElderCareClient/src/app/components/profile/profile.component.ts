import { Component, inject } from '@angular/core';
import { Post } from 'src/app/core/models/Post';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
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
}
