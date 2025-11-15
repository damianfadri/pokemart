import { Component } from '@angular/core';
import { ItemsComponent } from '../items/items';
import { CartComponent } from '../cart/cart';
import { FiltersComponent } from '../filters/filters';

@Component({
  selector: 'app-home',
  imports: [ItemsComponent, CartComponent, FiltersComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {

}
