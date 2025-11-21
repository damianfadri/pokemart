import { Component, computed, inject, signal } from '@angular/core';
import { CartContext } from './cart.context';
import { CartItemComponent } from './cart-item/cart-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  cartContext = inject(CartContext);

  items = computed(() => this.cartContext.list());

  total = computed(() => this.items().reduce((total, cartItem) => 
    total + cartItem.product.price * cartItem.quantity, 0));
}
