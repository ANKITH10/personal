import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  books: any[] = []; // To reflect books on the books page
  newBook = { title: '', author: '', price: 0, imageUrl: '' };
  selectedFile: File | null = null;

  private baseUrl = 'http://localhost:8080/api/admin';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchBooks();
  }

  // Fetch all users
  fetchUsers() {
    this.http.get<any[]>(`${this.baseUrl}/users`, { headers: this.headers }).subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Failed to fetch users:', err),
    });
  }

  // Fetch all books
  fetchBooks() {
    this.http.get<any[]>(`${this.baseUrl}/books`, { headers: this.headers }).subscribe({
      next: (data) => (this.books = data),
      error: (err) => console.error('Failed to fetch books:', err),
    });
  }

  // Handle file selection
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.newBook.imageUrl = reader.result as string; // Set the image URL to base64 data
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Add a book
  addBook() {
    if (this.newBook.title && this.newBook.author && this.newBook.price && this.newBook.imageUrl) {
      this.http.post(`${this.baseUrl}/add-book`, this.newBook, { headers: this.headers }).subscribe({
        next: () => {
          alert('Book added successfully!');
          this.books.push({ ...this.newBook }); // Add to books array for reflection on the books page
          this.newBook = { title: '', author: '', price: 0, imageUrl: '' }; // Reset form
          this.selectedFile = null;
        },
        error: (err) => console.error('Failed to add book:', err),
      });
    } else {
      alert('Please fill in all fields and select an image.');
    }
  }

  // Promote a user to admin
  makeAdmin(userId: number) {
    this.http.put(`${this.baseUrl}/make-admin/${userId}`, {}, { headers: this.headers }).subscribe({
      next: () => {
        alert('User promoted to admin!');
        this.fetchUsers(); // Refresh the users list
      },
      error: (err) => console.error('Failed to promote user:', err),
    });
  }

  // Delete a user
  deleteUser(userId: number) {
    this.http.delete(`${this.baseUrl}/users/${userId}`, { headers: this.headers }).subscribe({
      next: () => {
        alert('User deleted successfully!');
        this.fetchUsers(); // Refresh the users list
      },
      error: (err) => console.error('Failed to delete user:', err),
    });
  }
}
