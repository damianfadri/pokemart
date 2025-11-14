import { Component, inject, input, output } from '@angular/core';
import { CartItem } from '../../cart/cart-item/cart-item.model';
import { Item } from './item.model';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class ItemComponent {
  item = input.required<Item>();

  cartService = inject(CartService);

  addToCart() {
    this.cartService.addItem({
      name: this.item().name,
      quantity: 1,
      price: this.item().price
    });
  }
}
