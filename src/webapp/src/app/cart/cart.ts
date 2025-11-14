import { Component, computed, inject, signal } from '@angular/core';
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

  items = computed(() => this.cartService.getItems());

  totalPrice = computed(() => 
    this.items().reduce((total, item) => total + item.price * item.quantity, 0));
}
