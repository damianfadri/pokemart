import { computed, inject, Injectable, resource } from "@angular/core";
import { ProductsService } from "./products.service";
import { FiltersContext } from "../filters/filters.context";

@Injectable({ providedIn: 'root' })
export class ProductsContext {
  productsService = inject(ProductsService);
  filtersContext = inject(FiltersContext);

  fetchedProducts = resource({
    loader: () => this.productsService.getProducts()
  });

  products = computed(() => {
    let products = this.fetchedProducts.value() ?? [];

    const filters = this.filtersContext.filters();
    if (filters.categories) {
      const categories = filters.categories ?? ['Uncategorized'];

      products = products.filter(
        product => categories.includes(product.category ?? 'Uncategorized')
      );
    }

    if (filters.price) {
      const minPrice = filters.price.min ?? 0;
      const maxPrice = filters.price.max ?? Number.MAX_VALUE;

      products = products.filter(
        product => minPrice <= product.price && product.price <= maxPrice
      );
    }
    
    return products;
  });

  categories = computed(() => {
    const products = this.fetchedProducts.value() ?? [];

    if (products.length === 0) {
      return new Set<string>(['Uncategorized']);
    }

    return new Set<string>(products.map(product => product.category ?? 'Uncategorized'));
  });
}