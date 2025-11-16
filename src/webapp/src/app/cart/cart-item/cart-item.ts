import { Component, computed, inject, input, output } from '@angular/core';
import { CartContext } from '../cart.context';
import { Product } from '../../products/product/product.model';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  product = input.required<Product>();
  quantity = input.required<number>();

  cartContext = inject(CartContext);

  total = computed(() => this.product().price * this.quantity());

  removeFromCart() {
    this.cartContext.remove({
      product: this.product(),
      quantity: this.quantity()
    });
  }
}
