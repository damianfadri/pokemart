import { Component, inject, signal } from '@angular/core';
import { FiltersService } from './filters.service';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class FiltersComponent {
  filtersService = inject(FiltersService);

  categories = signal<Set<string>>(new Set<string>());

  toggled(category: string): boolean {
    return this.categories().has(category);
  }

  toggle(category: string, val: boolean) {
    this.categories.update(categories => {
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
        categories: [...this.categories()]
    }));
  }
}
