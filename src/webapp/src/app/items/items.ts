import { Component, computed, inject, resource } from '@angular/core';
import { ItemsService } from './items.service';
import { ItemComponent } from './item/item';
import { FiltersService } from '../filters/filters.service';

@Component({
  selector: 'app-items',
  imports: [ItemComponent],
  templateUrl: './items.html',
  styleUrl: './items.css',
})
export class ItemsComponent {
  itemsService = inject(ItemsService);
  filtersService = inject(FiltersService);

  items = resource({
    loader: () => this.itemsService.getItems()
  });

  filteredItems = computed(() => {
    if (this.items.hasValue()) {

      const filters = this.filtersService.filters();
      const items = this.items.value();

      if (!filters.categories) {
        return items;
      }

      if (filters.categories.length == 0) {
        return items;
      }

      return items.filter(
        item => filters.categories?.includes(item.category ?? 'Uncategorized')
      )
    }

    return [];
  });

  count = computed(() => this.filteredItems().length);
}
