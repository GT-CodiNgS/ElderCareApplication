import {Component, inject, OnInit} from '@angular/core';
import {Post, PostGenderType} from 'src/app/core/models/Post';
import {PostService} from 'src/app/core/services/post.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddPostComponent} from "../../../add-post/add-post.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {UserUpdate} from "../../../../core/models/UserUpdate";
import {UserService} from "../../../../core/services/user.service";
import {LocalStorageService} from "../../../../core/services/local-storage.service";
import {PasswordResetComponent} from "./inner-components/password-reset/password-reset.component";
import {ViewPostComponent} from "../../../home/view/home/inner-components/view-post/view-post.component";
import {ConfirmDialogComponent} from "../../../../core/dialog/confirm-dialog/confirm-dialog.component";
import {data} from "autoprefixer";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit{

  selectedUser = new UserUpdate(
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  );

  posts: Post[] = [];

  constructor(public dialog: MatDialog,
              private userService:UserService,
              private localStorageService: LocalStorageService) {
    // this.getUser();

    // this.selectedUser = new UserUpdate(
    //   'User',
    //   'Name',
    //   'user@gmail.com',
    //   '',
    //   '119',
    //   'Hikka',
    //   'Hikka',
    //   'gayash',
    // )
  }


  async getUser() {
    let userId = this.localStorageService.getItem('id');
    let byId = await this.userService.getById(userId);
    console.log(byId)
    if (byId) {
      this.selectedUser = byId
    }
  }

  itemsPerPage = 5;
  currentPage = 1;

  carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
  };

  postService = inject(PostService);

  ngOnInit(): void {
    this.getPost();
    this.getUser();
  }

  getPost(){
    let userId = this.localStorageService.getItem('id');
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
    let dialogConfig = new MatDialogConfig();

    const dialogRef =
      this.dialog.open(EditProfileComponent, {
        width: '500px',
        height: 'auto',
        panelClass: 'model-preview',
        hasBackdrop: true,
        data: this.selectedUser
      });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  resetPassword() {

      this.dialog.open(PasswordResetComponent, {
        width: '500px',
        height: 'auto',
        panelClass: 'model-preview',
        hasBackdrop: true,
      });
  }

  createNewPost() {
    let dialogRef = this.dialog.open(AddPostComponent, {
      width: '500px',
      height: 'auto',
      panelClass: 'model-preview',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getPost();
    })
  }

  edit(post:Post) {
    let dialogRef = this.dialog.open(AddPostComponent, {
      width: '500px',
      height: 'auto',
      panelClass: 'model-preview',
      hasBackdrop: true,
      data:post
    });

    dialogRef.afterClosed().subscribe( res => {
      this.getPost();
    })
  }

  view(post:Post) {
    let dialogRef = this.dialog.open(ViewPostComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'model-preview',
      hasBackdrop: true,
      data:post
    });
  }

  delete(post:Post) {
    let matDialogRef = this.dialog.open(
      ConfirmDialogComponent,
    {data: {title:'Delete Confirm',message:'Are you sure?' }}
    );
    matDialogRef.afterClosed().subscribe(res => {
      if (res){
        console.log(res)
        //delete
      }
    })
  }
}
