import { Component, computed, inject, input, output } from '@angular/core';
import { CartService } from '../cart.service';
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

  cartService = inject(CartService);

  total = computed(() => this.product().price * this.quantity());

  removeFromCart() {
    this.cartService.remove({
      product: this.product(),
      quantity: this.quantity()
    });
  }
}
