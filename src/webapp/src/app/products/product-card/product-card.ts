import { Component, inject, input } from '@angular/core';
import { Product } from '../product/product.model';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
  product = input.required<Product>();

  cartService = inject(CartService);

  addToCart() {
    this.cartService.add({
      product: this.product(),
      quantity: 1
    });
  }
}
