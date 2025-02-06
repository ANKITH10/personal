import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Add HttpClientModule here
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  returnUrl: string = '/books'; // Default to books page

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Get returnUrl from query params
    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
  }

  login() {
    const url = 'http://localhost:8080/api/auth/login';
    const payload = { username: this.username, password: this.password };

    this.http.post(url, payload).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token); // Save token
        alert('Login successful!');
        this.router.navigate([this.returnUrl]); // Redirect to returnUrl
      },
      error: () => {
        alert('Login failed! Check your credentials.');
      },
    });
  }
}
