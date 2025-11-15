import { Component, computed, inject, resource } from '@angular/core';
import { ProductsService } from './products.service';
import { ProductComponent } from './product/product';

@Component({
  selector: 'app-products',
  imports: [ProductComponent],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent {
  productsService = inject(ProductsService);

  products = computed(() => this.productsService.products());
  count = computed(() => this.products().length);
}
