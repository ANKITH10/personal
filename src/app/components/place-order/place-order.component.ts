import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PlaceOrderComponent {
  mobileNumber: string = '';
  address: string = '';

  constructor(private router: Router) {}

  confirmOrder() {
    if (!this.mobileNumber || !this.address) {
      alert('Please enter all details.');
      return;
    }

    const orderDetails = {
      mobileNumber: this.mobileNumber,
      address: this.address,
      cartItems: JSON.parse(localStorage.getItem('cart') || '[]'),
    };

    localStorage.setItem('order', JSON.stringify(orderDetails));
    alert('Order placed successfully!');
    localStorage.removeItem('cart'); // Clear cart after placing order
    this.router.navigate(['/']); // Redirect to home or success page
  }
}
