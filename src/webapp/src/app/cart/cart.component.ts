import { Component, inject, signal } from '@angular/core';
import { CartItem } from './cart.model';
import { CartService } from './cart.service';

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
  cartService = inject(CartService);

  get items(): CartItem[] {
    return this.cartService.getItems();
  }

  get totalPrice(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
