import { Component, inject, signal } from '@angular/core';
import { CartItem } from './cart.model';
import { CartService } from './cart.service';

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
