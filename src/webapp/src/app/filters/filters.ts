import { Component, computed, inject, resource, signal } from '@angular/core';
import { FiltersService } from './filters.service';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class FiltersComponent {
  filtersService = inject(FiltersService);
  productsService = inject(ProductsService);

  products = computed(() => this.productsService.products());
  categories = computed(() => this.productsService.categories());
  
  selectedCategories = signal<Set<string>>(new Set<string>());

  toggled(category: string): boolean {
    return this.selectedCategories().has(category);
  }

  toggle(category: string, val: boolean) {
    this.selectedCategories.update(categories => {
      if (val) {
        categories.add(category);
      } else {
        categories.delete(category);
      }

      return categories;
    });
  }

  onApply() {
    this.filtersService.filters.update(
      curr => ({
        ...curr,
        categories: [...this.selectedCategories()]
    }));
  }
}
