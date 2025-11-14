import { Component, signal } from '@angular/core';
import { CartComponent } from './cart/cart';
import { ItemsComponent } from './items/items';

@Component({
  selector: 'app-root',
  imports: [ItemsComponent, CartComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
