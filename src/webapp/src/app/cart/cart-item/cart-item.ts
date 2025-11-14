import { Component, computed, inject, input, output } from '@angular/core';
import { CartItem } from './cart-item.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  price = input.required<number>();
  name = input.required<string>();
  quantity = input.required<number>();

  total = computed(() => this.price() * this.quantity());

  cartService = inject(CartService);

  removeFromCart() {
    this.cartService.removeItem({
      name: this.name(),
      price: this.price(),
      quantity: this.quantity()
    });
  }
}
