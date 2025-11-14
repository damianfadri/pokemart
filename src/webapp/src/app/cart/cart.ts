import { Component, computed, inject, signal } from '@angular/core';
import { CartItem } from './cart.model';
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

  items = computed(() => this.cartService.getItems());

  totalPrice = computed(() => 
    this.items().reduce((total, item) => total + item.price * item.quantity, 0));
}
