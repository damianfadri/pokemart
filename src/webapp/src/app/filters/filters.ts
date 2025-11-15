import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FiltersService } from './filters.service';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class FiltersComponent {
  route = inject(ActivatedRoute);
  filtersService = inject(FiltersService);

  pokeballs = signal<boolean>(false);
  medicines = signal<boolean>(false);
  items = signal<boolean>(false);

  categories = signal<Set<string>>(new Set<string>());

  printed = computed(() => JSON.stringify(this.categories()));

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
