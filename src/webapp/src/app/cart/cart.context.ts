import { Injectable, signal } from '@angular/core';
import { CartItem } from './cart-item/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartContext {
  private items = signal<CartItem[]>([]);

  list(): CartItem[] {
    return this.items();
  }

  add(item: CartItem) {
    const existingItem = this.items().find(i => i.product.name === item.product.name);
    if (existingItem) {
      this.items.update(items => 
        items.map(i => i.product.name === item.product.name ? { ...i, quantity: i.quantity + item.quantity } : i));
    }
    else {
      this.items.update(items => [...items, item]);
    }
  }

  remove(item: CartItem) {
    const existingItem = this.items().find(i => i.product.name === item.product.name);
    if (existingItem) {
      if (existingItem.quantity > item.quantity) {
        this.items.update(items => 
          items.map(i => i.product.name === item.product.name ? { ...i, quantity: i.quantity - item.quantity } : i));
      } else {
        this.items.update(items => 
          items.filter(i => i.product.name !== item.product.name));
      }
    }
  }
}