import { Injectable, signal } from '@angular/core';
import { CartItem } from './cart-item/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  constructor() {
  }

  getItems() {
    return this.cartItems();
  }

  addItem(item: CartItem) {
    const existingItem = this.cartItems().find(i => i.name === item.name);
    if (existingItem) {
      this.cartItems.update(items => 
        items.map(i => i.name === item.name ? { ...i, quantity: i.quantity + item.quantity } : i));
    }
    else {
      this.cartItems.update(items => [...items, item]);
    }
  }

  removeItem(item: CartItem) {
    const existingItem = this.cartItems().find(i => i.name === item.name);
    if (existingItem) {
      if (existingItem.quantity > item.quantity) {
        this.cartItems.update(items => 
          items.map(i => i.name === item.name ? { ...i, quantity: i.quantity - item.quantity } : i));
      } else {
        this.cartItems.update(items => 
          items.filter(i => i.name !== item.name));
      }
    }
  }
}