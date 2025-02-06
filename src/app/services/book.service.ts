import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('❌ No token found! Redirecting to login.');
      return throwError(() => new Error('Unauthorized: No token found. Please log in again.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach token properly
    });

    return this.http.get(this.baseUrl, { headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('❌ API Error:', error);

    if (error.status === 401) {
      console.warn('⚠️ Unauthorized: Token might be expired.');
      return throwError(() => new Error('Unauthorized: Please login again.'));
    }
    return throwError(() => new Error('An unknown error occurred.'));
  }
}
