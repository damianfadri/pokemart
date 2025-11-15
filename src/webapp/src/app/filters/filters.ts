import { Component, computed, inject, resource, signal } from '@angular/core';
import { FiltersService } from './filters.service';
import { ItemsService } from '../items/items.service';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class FiltersComponent {
  filtersService = inject(FiltersService);
  itemsService = inject(ItemsService);

  items = resource({
    loader: () => this.itemsService.getItems()
  });

  categories = computed(() => {
    if (this.items.hasValue()) {
      return new Set<string>(this.items.value().map(item => item.category ?? 'Uncategorized'));
    }

    return new Set<string>(['Uncategorized']);
  });
  
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
