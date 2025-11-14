import { Component, input, output } from '@angular/core';
import { Item } from './item.model';
import { CartItem } from '../../cart/cart.model';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class ItemComponent {
  name = input.required<string>();
  category = input.required<string>();
  price = input.required<number>();
  description = input.required<string>();

  addToCart = output<CartItem>();

  onAdd() {
    this.addToCart.emit({
      name: this.name(),
      quantity: 1,
      price: this.price()
    });
  }
}
