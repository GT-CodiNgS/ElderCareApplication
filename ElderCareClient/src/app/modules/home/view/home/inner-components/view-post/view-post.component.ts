import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post, PostGenderType } from 'src/app/core/models/Post';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Post) {}
  PostGenderType = PostGenderType;

  post = this.data;

  ngOnInit(): void {}
}
