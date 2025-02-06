import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for basic Angular directives like ngIf, ngFor

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule] // Ensure CommonModule is imported for using Angular directives
})
export class HomeComponent {
  title = 'Welcome to the Online Bookstore';
}
