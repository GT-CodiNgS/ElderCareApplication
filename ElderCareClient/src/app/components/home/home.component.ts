import { Component } from '@angular/core';

interface Post {
  title: string;
  description: string;
  date?: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  itemsPerPage = 5;
  currentPage = 1;
  posts: Post[] = [
    {
      title: 'Post 1',
      description:
        'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
      date: '2021-01-01',
    },
    {
      title: 'Post 2',
      description:
        'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    },
    {
      title: 'Post 3',
      description:
        'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    },
    {
      title: 'Post 4',
      description:
        'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    },
    {
      title: 'Post 5',
      description:
        'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    },
    {
      title: 'Post 6',
      description:
        'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    },
    {
      title: 'Post 7',
      description:
        'Lorem Ipsum is simply dummy text of the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
    },
    // Add more card objects as needed
  ];

  carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
  };

  images = [
    'src/assets/images/1.jpg',
    'src/assets/images/1.jpg',
    'src/assets/images/1.jpg',
    'src/assets/images/1.jpg',
  ];
}
