import { Component, signal } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { ItemsComponent } from './items/items.component';

@Component({
  selector: 'app-root',
  imports: [ItemsComponent, CartComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
