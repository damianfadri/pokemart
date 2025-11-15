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

  items = computed(() => this.itemsService.items());
  categories = computed(() => this.itemsService.categories());
  
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
