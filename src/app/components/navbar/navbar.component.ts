import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.updateCartCount();
    window.addEventListener('storage', () => this.updateCartCount()); // Listen for cart updates
  }

  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCount = cart.length;
  }
}
