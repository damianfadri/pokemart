import { Component, input, output } from '@angular/core';
import { CartItem } from '../../cart/cart-item/cart-item.model';
import { Item } from './item.model';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class ItemComponent {
  item = input.required<Item>();

  addToCart = output<CartItem>();

  onAdd() {
    this.addToCart.emit({
      name: this.item().name,
      quantity: 1,
      price: this.item().price
    });
  }
}
