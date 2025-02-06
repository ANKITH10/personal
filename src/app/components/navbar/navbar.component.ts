import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import for using common directives

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule] // Necessary for directives like *ngIf, *ngFor in the template
})
export class NavbarComponent {}
