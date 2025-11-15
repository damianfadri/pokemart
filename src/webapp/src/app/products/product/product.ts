import { Component, inject, input } from '@angular/core';
import { Product } from './product.model';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductComponent {
  product = input.required<Product>();

  cartService = inject(CartService);

  addToCart() {
    this.cartService.add({
      product: this.product(),
      quantity: 1
    });
  }
}
