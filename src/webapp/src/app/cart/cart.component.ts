import { Component, inject, signal } from '@angular/core';
import { CartItem } from './cart-item.model';

const defaultCartItems: CartItem[] = [
  { name: 'Potion', quantity: 1, price: 300 },
  { name: 'Great Ball', quantity: 3, price: 600 },
];

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  cartItems = signal<CartItem[]>(defaultCartItems);

  get totalPrice(): number {
    return this.cartItems().reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
