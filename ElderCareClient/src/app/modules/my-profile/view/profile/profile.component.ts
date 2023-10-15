import {Component, inject} from '@angular/core';
import {Post, PostGenderType} from 'src/app/core/models/Post';
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
    ''
  );

  posts: Post[] = [
    {
      id: '1234567890',
      title: 'Sample Post Title 1',
      description: 'This is a brief description of the first sample post.',
      postGenderType: PostGenderType.Male,
      body: 'This is the main content of the first sample post. It provides detailed information about the topic and relevant data.',
      createdDate: new Date('2023-10-14T00:00:00Z'),
      updatedDate: new Date('2023-10-15T12:34:56Z'),
      createdBy: 'user_001',
      updatedBy: 'user_002',
    },
    {
      id: '2345678901',
      title: 'Sample Post Title 2',
      description: 'This is a brief description of the second sample post.',
      postGenderType: PostGenderType.Male,
      body: 'This is the main content of the second sample post. It delves into the intricacies of the subject matter.',
      createdDate: new Date('2023-10-15T01:23:45Z'),
      createdBy: 'user_003',
    },
    {
      id: '3456789012',
      title: 'Sample Post Title 3',
      description: 'This is a brief description of the third sample post.',
      postGenderType: PostGenderType.Male,
      body: 'This is the main content of the third sample post. It gives an overview of the theme and its relevance.',
      createdDate: new Date('2023-10-16T10:10:10Z'),
      updatedDate: new Date('2023-10-16T20:20:20Z'),
      createdBy: 'user_004',
      updatedBy: 'user_005',
    },
  ];

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

  createNewPost() {
    this.dialog.open(AddPostComponent, {
      width: '500px',
      height: 'auto',
      panelClass: 'model-preview',
      hasBackdrop: true,
    });
  }
}
