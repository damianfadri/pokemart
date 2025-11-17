import { Component, inject, input } from '@angular/core';
import { Product } from '../../product/product.model';
import { CartContext } from '../../cart/cart.context';
import { RouterLink } from '@angular/router';
import { CartButtonComponent } from '../../cart/cart-button/cart-button';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CartButtonComponent],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
}
