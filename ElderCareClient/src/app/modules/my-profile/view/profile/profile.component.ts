import {Component, inject} from '@angular/core';
import {Post} from 'src/app/core/models/Post';
import {PostService} from 'src/app/core/services/post.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddPostComponent} from "../../../add-post/add-post.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {UserUpdate} from "../../../../core/models/UserUpdate";
import {UserService} from "../../../../core/services/user.service";
import {LocalStorageService} from "../../../../core/services/local-storage.service";
import {PasswordResetComponent} from "./inner-components/password-reset/password-reset.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  selectedUser = new UserUpdate(
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  );

  constructor(public dialog: MatDialog,
              private userService:UserService,
              private localStorageService: LocalStorageService) {
    // this.getUser();

    this.selectedUser = new UserUpdate(
      'User',
      'Name',
      'user@gmail.com',
      '',
      '119',
      'Hikka',
      'Hikka',
      'gayash',
      'sdasdasdasdasd',
    )
  }


  async getUser() {
    let userId = this.localStorageService.getItem('userId');
    let byId = await this.userService.getById(userId);
    if (byId) {
      this.selectedUser = byId
    }
  }

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
}
