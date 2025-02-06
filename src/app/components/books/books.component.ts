import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class BooksComponent implements OnInit {
  books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 499, imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765' },
    { id: 2, title: '1984', author: 'George Orwell', price: 399, imageUrl: 'https://images.unsplash.com/photo-1529482697261-381a79a99e49' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 299, imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: 450, imageUrl: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d' },
    { id: 5, title: 'Moby-Dick', author: 'Herman Melville', price: 350, imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794' }
  ];

  searchQuery: string = '';
  filteredBooks = [...this.books];

  constructor(private router: Router) {} // Inject Router for navigation

  ngOnInit(): void {}

  filterBooks() {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addToCart(book: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));

    window.dispatchEvent(new Event('storage')); // Notify navbar to update count

    alert(`"${book.title}" added to cart!`);
  }

  goToCart() {
    this.router.navigate(['/cart']); // Navigate to cart page
  }
}
