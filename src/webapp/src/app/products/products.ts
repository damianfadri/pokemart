import { Component, computed, inject } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card';
import { ProductsContext } from './product.context';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent {
  productsContext = inject(ProductsContext);

  products = computed(() => this.productsContext.products());
  count = computed(() => (this.products().length));
}
