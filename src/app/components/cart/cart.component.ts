import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    window.dispatchEvent(new Event('storage')); // Update cart count
  }
}
