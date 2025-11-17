import { Component, inject, input } from '@angular/core';
import { CartContext } from '../cart.context';
import { Product } from '../../products/product/product.model';

@Component({
  selector: 'app-cart-button',
  imports: [],
  templateUrl: './cart-button.html',
  styleUrl: './cart-button.css',
})
export class CartButtonComponent {
  product = input.required<Product>();
  cartContext = inject(CartContext);
  
  addToCart() {
    this.cartContext.add({
      product: this.product(),
      quantity: 1
    });
  }
}
