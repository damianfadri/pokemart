import { Component, computed, inject, input, output } from '@angular/core';
import { CartItem } from './cart-item.model';
import { CartService } from '../cart.service';
import { Item } from '../../items/item/item.model';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  item = input.required<Item>();
  quantity = input.required<number>();

  total = computed(() => this.item().price * this.quantity());

  cartService = inject(CartService);

  removeFromCart() {
    this.cartService.removeItem({
      item: this.item(),
      quantity: this.quantity()
    });
  }
}
