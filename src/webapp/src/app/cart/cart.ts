import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from './cart.service';
import { CartItemComponent } from './cart-item/cart-item';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  cartService = inject(CartService);

  items = computed(() => this.cartService.list());

  total = computed(() => this.items().reduce((total, cartItem) => 
    total + cartItem.product.price * cartItem.quantity, 0));
}
