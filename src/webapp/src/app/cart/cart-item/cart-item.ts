import { Component, computed, input, output } from '@angular/core';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  price = input.required<number>();
  name = input.required<string>();
  quantity = input.required<number>();

  total = computed(() => this.price() * this.quantity());

  removeFromCart = output<CartItem>();

  onClickRemove() {
    this.removeFromCart.emit({
      name: this.name(),
      price: this.price(),
      quantity: this.quantity()
    });
  }
}
