import { Component, computed, inject, resource, signal } from '@angular/core';
import { FiltersService } from './filters.service';
import { ProductsService } from '../products/products.service';
import { ProductsContext } from '../products/product.context';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class FiltersComponent {
  filtersService = inject(FiltersService);
  productsContext = inject(ProductsContext);

  products = computed(() => this.productsContext.products());
  categories = computed(() => this.productsContext.categories());

  selectedCategories = signal<Set<string>>(new Set<string>());

  minPrice = signal<number | undefined>(undefined);
  maxPrice = signal<number | undefined>(undefined);

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

  setMinPrice(val: number) {
    if (val <= 0) {
      this.minPrice.set(undefined);
      return;
    }

    this.minPrice.set(val);
    if (val > (this.maxPrice() ?? Number.MAX_VALUE)) {
      this.maxPrice.set(val);
    }
  }

  setMaxPrice(val: number) {
    if (val <= 0) {
      this.maxPrice.set(undefined);
      return;
    }

    this.maxPrice.set(val);
    if (val < (this.minPrice() ?? 0)) {
      this.minPrice.set(val);
    }
  }

  onApply() {

    console.log(JSON.stringify({
      categories: [...this.selectedCategories()],
      price: {
        min: this.minPrice(), 
        max: this.maxPrice()
      }
    }));
    
    this.filtersService.filters.set({
      categories: [...this.selectedCategories()],
      price: {
        min: this.minPrice(), 
        max: this.maxPrice()
      }
    });
  }
}
