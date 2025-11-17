import { Component, computed, inject, input } from '@angular/core';
import { CartContext } from '../cart.context';
import { Product } from '../../product/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-button',
  imports: [CommonModule],
  templateUrl: './cart-button.html',
  styleUrl: './cart-button.css',
})
export class CartButtonComponent {
  product = input.required<Product>();
  cartContext = inject(CartContext);
  
  quantity = computed(() => {
    const found = this.cartContext.list()
      .find(item => item.product.name === this.product().name);

    return found ? found.quantity : 0;
  });

  canAddToCart = computed(() => {
    return this.quantity() < (this.product().stock ?? 0);
  });

  addToCart() {
    if (!this.canAddToCart()) {
      return;
    }

    this.cartContext.add({
      product: this.product(),
      quantity: 1
    });
  }

  removeFromCart() {
    this.cartContext.remove({
      product: this.product(),
      quantity: 1
    });
  }
}
