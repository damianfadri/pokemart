import { Component, inject, input } from '@angular/core';
import { Product } from '../product/product.model';
import { CartService } from '../../cart/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
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
