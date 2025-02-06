import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class BooksComponent implements OnInit {
  books = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 499,
      imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765',
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      price: 399,
      imageUrl: 'https://images.unsplash.com/photo-1529482697261-381a79a99e49',
    },
    {
      id: 3,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 299,
      imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  addToCart(book: any) {
    alert(`"${book.title}" added to cart!`);
  }
}
