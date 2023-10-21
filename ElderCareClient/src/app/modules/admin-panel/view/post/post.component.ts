import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Post } from 'src/app/core/models/Post';
import { PostService } from 'src/app/core/services/post.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewPostComponent } from 'src/app/modules/home/view/home/inner-components/view-post/view-post.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/core/dialog/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  displayedColumns: string[] = [
    'actions',
    'title',
    'createdby',
    'createdDate',
    'postGenderType',
    'city',
    'verified',
    'delete',
  ];
  dataSource = new MatTableDataSource<Post>();

  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchQuery: string = '';
  postService = inject(PostService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
      this.filteredPosts = posts;
      this.dataSource.data = this.filteredPosts;
    });
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getGenderText(genderType: number): string {
    switch (genderType) {
      case 0:
        return 'Male';
      case 1:
        return 'Female';
      case 2:
        return 'Unisex';
      default:
        return 'Unknown';
    }
  }

  verifyOnClick(postId: any) {
    this.postService.verifyPost(postId.id).subscribe((res) => {
      this.getAllPosts();
      this.snackbarService.openCustomSnackBar(
        'Post verified successfully!',
        'success'
      );
    });
  }

  searchPosts(query: string): void {
    query = query.trim();

    if (!query) {
      this.filteredPosts = [...this.posts];
      this.dataSource.data = this.filteredPosts;
      return;
    }

    this.filteredPosts = this.posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    this.dataSource.data = this.filteredPosts;
  }

  onCheckboxChange(event: any): void {
    console.log('Checkbox value:', event.checked);
    if (event.checked) {
      this.filteredPosts = this.filteredPosts.filter(
        (post) => post.isVerified === false
      );
      this.dataSource.data = this.filteredPosts;
    } else {
      this.getAllPosts();
    }
  }

  searchPostsByVerify(query: string): void {
    query = query.trim();

    if (!query) {
      this.filteredPosts = [...this.posts];
      this.dataSource.data = this.filteredPosts;
      return;
    }

    this.filteredPosts = this.posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    this.dataSource.data = this.filteredPosts;
  }

  viewRow(row: any) {
    console.log('View clicked for:', row);
    this.postService.getPostById(row.id).subscribe((post) => {
      this.OpenViewDialog(post);
    });
  }

  OpenViewDialog(post: any) {
    let dialogRef = this.dialog.open(ViewPostComponent, {
      width: '1022px',
      height: '650px',
      panelClass: 'model-preview',
      hasBackdrop: true,
      data: post,
    });
  }

  deleteRow(row: any) {
    console.log('Delete clicked for:', row);
    this.delete(row);
  }

  delete(post: Post) {
    let matDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { post: post, title: 'Delete Confirm', message: 'Are you sure?' },
    });
    matDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAllPosts();
      }
    });
  }
}
