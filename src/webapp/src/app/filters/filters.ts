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
