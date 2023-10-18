import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { Post, PostGenderType } from 'src/app/core/models/Post';
import { PostService } from 'src/app/core/services/post.service';
import { AddPostComponent } from '../../../add-post/add-post.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewPostComponent } from './inner-components/view-post/view-post.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('blink', [
      state('red', style({ color: 'red' })),
      state('blue', style({ color: 'blue' })),
      state('green', style({ color: 'green' })),
      state('yellow', style({ color: 'yellow' })),
      transition('* <=> *', [animate('1s')]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  itemsPerPage = 5;
  currentPage = 1;
  PostGenderType = PostGenderType;
  currentLanguage!: string;

  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchQuery: string = '';

  carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
  };
  colorState: string = 'red';
  postService = inject(PostService);

  constructor(public dialog: MatDialog, private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });
    this.currentLanguage = this.translate.currentLang || 'en';
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.filteredPosts = posts;
    });
    let colors: string[] = ['red', 'blue', 'green', 'yellow'];
    let index = 0;

    setInterval(() => {
      this.colorState = colors[index % colors.length];
      index++;
    }, 800);
  }

  searchPosts(query: string): void {
    query = query.trim();

    if (!query) {
      this.filteredPosts = [...this.posts];
      return;
    }

    this.filteredPosts = this.posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  viewPost(post: Post) {
    let dialogRef = this.dialog.open(ViewPostComponent, {
      width: '1022px',
      height: '650px',
      panelClass: 'model-preview',
      hasBackdrop: true,
      data: post,
    });
  }
}
