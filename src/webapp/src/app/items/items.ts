import { Component, computed, inject, resource } from '@angular/core';
import { ItemsService } from './items.service';
import { ItemComponent } from './item/item';

@Component({
  selector: 'app-items',
  imports: [ItemComponent],
  templateUrl: './items.html',
  styleUrl: './items.css',
})
export class ItemsComponent {
  itemsService = inject(ItemsService);
  
  items = resource({
    loader: () => this.itemsService.getItems()
  });

  count = computed(() => {
    if (this.items.hasValue()) {
      return this.items.value().length;
    }

    return 0;
  });
}
