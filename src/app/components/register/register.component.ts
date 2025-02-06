import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule] // Import HttpClientModule here
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  register() {
    const url = 'http://localhost:8080/api/auth/register';
    const payload = { name: this.name, email: this.email, password: this.password };

    this.http.post(url, payload).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful!');
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed!');
      },
    });
  }
}
