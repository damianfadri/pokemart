import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products';
import { CartComponent } from '../cart/cart';
import { FiltersComponent } from '../filters/filters';

@Component({
  selector: 'app-home',
  imports: [ProductsComponent, CartComponent, FiltersComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {

}
