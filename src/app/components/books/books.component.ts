import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  searchQuery: string = '';
  private baseUrl = 'http://localhost:8080/api/books';

  private http = inject(HttpClient); // ✅ Ensure HttpClient is injected properly
  private router = inject(Router);   // ✅ Ensure Router is injected properly

  ngOnInit(): void {
    this.fetchBooks();
  }

  // ✅ Fetch books with authentication
  fetchBooks() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (data) => {
        // Ensure image URLs are properly prefixed if stored as relative paths
        this.books = data.map(book => ({
          ...book,
          imageUrl: `http://localhost:8080${book.imageUrl}` // Convert relative paths to absolute URLs
        }));
        this.filteredBooks = [...this.books];
      },
      error: (err) => console.error('Failed to fetch books:', err),
    });
  }
  

  // ✅ Filter books by search query
  filterBooks() {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // ✅ Add book to cart
  addToCart(book: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first!');
      this.router.navigate(['/login']);
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));

    window.dispatchEvent(new Event('storage'));

    alert(`"${book.title}" added to cart!`);
  }
}
