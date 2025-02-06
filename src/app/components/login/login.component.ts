import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule] // Ensure HttpClientModule is imported
})
export class LoginComponent {
  username: string = ''; // Changed from email to username
  password: string = '';

  constructor(private http: HttpClient) {}

  login() {
    const url = 'http://localhost:8080/api/auth/login';
    const payload = { 
      username: this.username.trim(), // Ensure field name is "username"
      password: this.password.trim()
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(url, JSON.stringify(payload), { headers }).subscribe({
      next: (response: any) => {
        console.log('✅ Login successful:', response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          alert('Login successful! Token stored.');
        } else {
          alert('Login successful, but no token received.');
        }
      },
      error: (error) => {
        console.error('❌ Login failed:', error);

        let errorMessage = 'Login failed!';
        if (error.status === 401) {
          errorMessage = 'Invalid username or password';
        } else if (error.status === 500) {
          errorMessage = 'Server error, please try again later.';
        } else if (error.error) {
          errorMessage = error.error;
        }

        alert(errorMessage);
      },
    });
  }
}
